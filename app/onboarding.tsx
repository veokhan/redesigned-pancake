import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Check } from 'lucide-react-native';
import { OnboardingShape } from '@/components/OnboardingShape';

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.shapeContainer}>
          <OnboardingShape />
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to ID Connect</Text>
          <Text style={styles.subtitle}>
            Your platform for verified profiles, discovery, and genuine connections.
          </Text>

          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <View style={styles.checkContainer}>
                <Check color="#0000FF" size={20} />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Verified Profiles:</Text>
                <Text style={styles.featureDescription}>Build trust with authentic identities.</Text>
              </View>
            </View>

            <View style={styles.feature}>
              <View style={styles.checkContainer}>
                <Check color="#0000FF" size={20} />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Local & Global Discovery:</Text>
                <Text style={styles.featureDescription}>Find people near and far.</Text>
              </View>
            </View>

            <View style={styles.feature}>
              <View style={styles.checkContainer}>
                <Check color="#0000FF" size={20} />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Real Connections:</Text>
                <Text style={styles.featureDescription}>Move beyond the superficial.</Text>
              </View>
            </View>
          </View>

          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>
              For a genuine community, please use accurate details and a clear profile photo. 
              This helps everyone connect with confidence.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.push('/auth/register')}
        >
          <Text style={styles.startButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  shapeContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    color: '#666666',
    lineHeight: 24,
    marginBottom: 40,
  },
  featuresContainer: {
    marginBottom: 40,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  checkContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E6E6FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 20,
  },
  noteContainer: {
    backgroundColor: '#E6E6FA',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  noteText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#0000FF',
    lineHeight: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  startButton: {
    backgroundColor: '#0000FF',
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});