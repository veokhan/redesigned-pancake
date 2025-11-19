import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Send, Circle } from 'lucide-react-native';
import { mockUsers } from '@/data/mockUsers';

interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  delivered: boolean;
}

export default function PrivateChatScreen() {
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: id as string,
      text: 'Hey! I saw your profile and thought we had a lot in common!',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      delivered: true,
    },
    {
      id: '2',
      senderId: 'current_user',
      text: 'Hi! Thanks for reaching out! I checked out your profile too.',
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      delivered: true,
    },
    {
      id: '3',
      senderId: id as string,
      text: 'What got you interested in photography?',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      delivered: true,
    },
  ]);
  const [messageCount, setMessageCount] = useState(1); // Track messages sent by current user
  const [isAccepted, setIsAccepted] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const user = mockUsers.find(u => u.id === id);

  useEffect(() => {
    // Auto scroll to bottom when messages change
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>User not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const sendMessage = () => {
    if (!message.trim()) return;

    if (!isAccepted && messageCount >= 3) {
      Alert.alert(
        'Message limit reached',
        'You can send up to 3 messages until the other person replies or accepts your chat request.',
        [{ text: 'OK' }]
      );
      return;
    }

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'current_user',
      text: message.trim(),
      timestamp: new Date(),
      delivered: false,
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    if (!isAccepted) {
      setMessageCount(prev => prev + 1);
    }

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, delivered: true }
            : msg
        )
      );
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const isMyMessage = (senderId: string) => senderId === 'current_user';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#1A1A1A" size={24} />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Image source={{ uri: user.profilePicUrl }} style={styles.headerAvatar} />
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>{user.fullName}</Text>
            <Text style={styles.headerStatus}>
              {user.onlineStatus ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>
      </View>

      {!isAccepted && (
        <View style={styles.limitBanner}>
          <Text style={styles.limitText}>
            You can send {3 - messageCount} more message{3 - messageCount !== 1 ? 's' : ''} until {user.fullName} replies
          </Text>
        </View>
      )}

      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageRow,
                isMyMessage(msg.senderId) && styles.myMessageRow
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  isMyMessage(msg.senderId) ? styles.myMessage : styles.theirMessage
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    isMyMessage(msg.senderId) && styles.myMessageText
                  ]}
                >
                  {msg.text}
                </Text>
                <View style={styles.messageFooter}>
                  <Text
                    style={[
                      styles.messageTime,
                      isMyMessage(msg.senderId) && styles.myMessageTime
                    ]}
                  >
                    {formatTime(msg.timestamp)}
                  </Text>
                  {isMyMessage(msg.senderId) && (
                    <Circle 
                      color={msg.delivered ? "#4CAF50" : "#999999"} 
                      size={8} 
                      fill={msg.delivered ? "#4CAF50" : "#999999"}
                    />
                  )}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Type your message..."
            placeholderTextColor="#999999"
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
            editable={isAccepted || messageCount < 3}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!message.trim() || (!isAccepted && messageCount >= 3)) && styles.sendButtonDisabled
            ]}
            onPress={sendMessage}
            disabled={!message.trim() || (!isAccepted && messageCount >= 3)}
          >
            <Send color={
              message.trim() && (isAccepted || messageCount < 3) 
                ? "#FFFFFF" 
                : "#999999"
            } size={20} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    marginRight: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
  },
  headerStatus: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#4CAF50',
  },
  limitBanner: {
    backgroundColor: '#FFF3CD',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6A8',
  },
  limitText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#856404',
    textAlign: 'center',
  },
  keyboardAvoid: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 100,
  },
  messageRow: {
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  myMessageRow: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  theirMessage: {
    backgroundColor: '#F5F7FA',
  },
  myMessage: {
    backgroundColor: '#2D63FF',
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1A1A1A',
    lineHeight: 20,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  messageTime: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#999999',
  },
  myMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1A1A1A',
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2D63FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#F0F0F0',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
});