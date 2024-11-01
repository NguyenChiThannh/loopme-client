import ChatArea from '@/features/chat/components/chat-area';
import ContactList from '@/features/chat/components/contact-list';
import NewChatModal from '@/features/chat/components/new-chat-model';
import React, { useState } from 'react'

export interface Contact {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
}

export interface Message {
    id: string;
    senderId: string;
    content: string;
    timestamp: string;
}

const initialContacts: Contact[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: '/placeholder.svg?height=40&width=40',
    lastMessage: 'Hey, how are you?',
    lastMessageTime: '10:30 AM',
    unreadCount: 2
  },
  {
    id: '2',
    name: 'Bob Smith',
    avatar: '/placeholder.svg?height=40&width=40',
    lastMessage: 'Can we meet tomorrow?',
    lastMessageTime: 'Yesterday',
    unreadCount: 0
  },
  {
    id: '3',
    name: 'Carol Williams',
    avatar: '/placeholder.svg?height=40&width=40',
    lastMessage: 'Thanks for your help!',
    lastMessageTime: 'Monday',
    unreadCount: 5
  },
]

const initialMessages: Message[] = []

export default function ChatPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewChatModal, setShowNewChatModal] = useState(false)
  const [newChatName, setNewChatName] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      const newMsg: Message = {
        id: Date.now().toString(),
        senderId: 'currentUser',
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([...messages, newMsg])
      setNewMessage('')
    }
  }

  const handleNewChat = () => {
    if (newChatName.trim()) {
      const newContact: Contact = {
        id: Date.now().toString(),
        name: newChatName.trim(),
        avatar: '/placeholder.svg?height=40&width=40',
        lastMessage: '',
        lastMessageTime: 'Just now',
        unreadCount: 0
      }
      setContacts([...contacts, newContact])
      setSelectedContact(newContact)
      setNewChatName('')
      setShowNewChatModal(false)
    }
  }

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
    // Clear unread count when selecting a contact
    setContacts(contacts.map(c => 
      c.id === contact.id ? { ...c, unreadCount: 0 } : c
    ))
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <ContactList
        contacts={contacts}
        selectedContact={selectedContact}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onContactSelect={handleContactSelect}
        onNewChat={() => setShowNewChatModal(true)}
      />
      <ChatArea
        selectedContact={selectedContact}
        messages={messages}
        newMessage={newMessage}
        onNewMessageChange={setNewMessage}
        onSendMessage={handleSendMessage}
      />
      <NewChatModal
        isOpen={showNewChatModal}
        newChatName={newChatName}
        onNewChatNameChange={setNewChatName}
        onClose={() => setShowNewChatModal(false)}
        onSubmit={handleNewChat}
      />
    </div>
  )
}