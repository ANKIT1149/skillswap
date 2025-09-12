export interface Message {
    $id?: string,
  chatId: string;
  sender: string;
  message: string;
  timestamp: string;
  type: 'text' | 'image' | 'voice' | 'video';
  hasResources?: boolean
  fileId?: string
}
