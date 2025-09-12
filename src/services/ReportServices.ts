import { database } from '@/db/Appwrite';
import { ReportInterface } from '@/interface/ReportInterface';
import { ID, Query } from 'appwrite';
import { BlockedService } from './BlockedService';
import BlockEmailTempelate from '@/template/BlockEmailTempelate';
import ReportEmailTempelate from '@/template/ReportEmailTempelate';
import axios from 'axios';

export const ReportService = async ({
  chatId,
  reportedBy,
  reportedUser,
  message,
}: ReportInterface) => {
  if (!reportedBy || !reportedUser || !message || !chatId) {
    throw new Error('Please provide all field');
  }

  console.log('data revieved', chatId, reportedBy, reportedUser, message)
  try {
    const queryDb = await database.listRows({
      databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
      tableId: process.env.NEXT_PUBLIC_REPORTS_COLLECTION_ID!,
      queries: [Query.equal('chatId', chatId)],
    });

    const listUser = await database.listRows({
      databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
      tableId: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      queries: [Query.equal('userId', reportedUser)],
    });

    console.log(listUser.rows[0])

    if (listUser.rows.length === 0) {
      throw new Error('User not found');
    }

    const totalReportCount = listUser.rows[0].totalReportCount;
    const listUserId = listUser.rows[0].$id;
    const userEmail = listUser.rows[0].email;
    const username = listUser.rows[0].username;
    
    console.log('listuser', listUserId, userEmail, username)
    let updateDb = {};

    if (queryDb.rows.length === 0) {
      const CreateReport = await database.createRow({
        databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
        tableId: process.env.NEXT_PUBLIC_REPORTS_COLLECTION_ID!,
        rowId: ID.unique(),
        data: {
          chatId: chatId,
          reportedBy: reportedBy,
          reportedUser: reportedUser,
          message: message,
          timestamp: new Date().toISOString(),
          reportCount: 1,
        },
      });

      await database.updateRow({
        databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
        tableId: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
        rowId: listUserId,
        data: {
          totalReportCount: totalReportCount + 1,
        },
      });
      updateDb = CreateReport;
    } else {
      const queryID = queryDb.rows[0].$id;
      const reportCount = queryDb.rows[0].reportCount;

      if (reportCount > 5 || totalReportCount > 9) {
        const blockedUser = await BlockedService(reportedBy, reportedUser);

        await database.updateRow({
          databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
          tableId: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
          rowId: listUserId,
          data: {
            blockedUntill: new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000
            ).toISOString(),
          },
        });

        const body = BlockEmailTempelate(username);
        const sendingMail = await axios.post('/api/sendreport', {
          email: userEmail,
          subject: 'Regarding Blocking User Account',
          body,
        });

        if (!sendingMail.data) {
          throw new Error('Error in Sending mail');
        }

        return blockedUser;
      } else {
        const updateReport = await database.updateRow({
          databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
          tableId: process.env.NEXT_PUBLIC_REPORTS_COLLECTION_ID!,
          rowId: queryID,
          data: {
            reportCount: reportCount + 1,
          },
        });

        await database.updateRow({
          databaseId: process.env.NEXT_PUBLIC_DATABSE_ID!,
          tableId: process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
          rowId: listUserId,
          data: {
            totalReportCount: totalReportCount + 1,
          },
        });

        updateDb = updateReport;
      }
    }

    const body = ReportEmailTempelate(username);
    console.log(body)
    const sendingMail = await axios.post('/api/sendreport', {
      email: userEmail,
      subject: 'Regarding Report Warning User Account',
      body
    });

    if (sendingMail.status === 200) {
      return updateDb;
    }
  } catch (error) {
    console.log('Error in Reporting User', error);
    throw new Error('Error in Reporting User');
  }
};
