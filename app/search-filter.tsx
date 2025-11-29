import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Search, ChevronDown, X } from 'lucide-react-native';

export default function SearchFilterScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [occupationType, setOccupationType] = useState<'all' | 'education' | 'work'>('all');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [countryDropdownVisible, setCountryDropdownVisible] = useState(false);
  const [genderDropdownVisible, setGenderDropdownVisible] = useState(false);
  const [degreeDropdownVisible, setDegreeDropdownVisible] = useState(false);

  const countries = ['USA', 'Canada', 'UK', 'Australia', 'Germany', 'France', 'Japan', 'Brazil', 'Pakistan', 'India'];
  const genders = ['Male', 'Female', 'Other'];
  const degreeOptions = ['Primary', 'Middle', 'Matric', 'Intermediate', 'Bachelor', 'Master', 'PhD'];

  const handleOccupationChange = (type: 'all' | 'education' | 'work') => {
    setOccupationType(type);
    if (type !== 'education') {
      setSelectedDegree('');
    }
  };

  const handleApplyFilters = () => {
    const filters: Record<string, any> = {
      searchTerm,
      selectedCountry,
      selectedCity,
      selectedGender,
      minAge,
      maxAge,
      occupationType,
      onlineOnly
    };
    
    if (occupationType === 'education' && selectedDegree) {
      filters.selectedDegree = selectedDegree;
    }
    
    console.log('Applying filters:', filters);
    router.back();
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCountry('');
    setSelectedCity('');
    setSelectedGender('');
    setMinAge('');
    setMaxAge('');
    setOccupationType('all');
    setSelectedDegree('');
    setOnlineOnly(false);
  };

  const getBorderColor = (field: string) =>
    focusedField === field ? '#3F51B5' : '#CBD5E1';

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedCountry) count++;
    if (selectedCity) count++;
    if (selectedGender) count++;
    if (minAge || maxAge) count++;
    if (occupationType !== 'all') count++;
    if (occupationType === 'education' && selectedDegree) count++;
    if (onlineOnly) count++;
    return count;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#1E293B" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search & Filter</Text>
        {getActiveFiltersCount() > 0 && (
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeText}>{getActiveFiltersCount()}</Text>
          </View>
        )}
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search</Text>
          <View style={[styles.searchContainer, focusedField === 'search' && styles.searchContainerFocused]}>
            <Search color="#94A3B8" size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name or handle"
              placeholderTextColor="#94A3B8"
              value={searchTerm}
              onChangeText={setSearchTerm}
              onFocus={() => setFocusedField('search')}
              onBlur={() => setFocusedField(null)}
            />
            {searchTerm.length > 0 && (
              <TouchableOpacity onPress={() => setSearchTerm('')}>
                <X color="#94A3B8" size={18} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Country</Text>
            <TouchableOpacity
              style={[styles.dropdown, { borderBottomColor: getBorderColor('country') }]}
              onPress={() => setCountryDropdownVisible(true)}
            >
              <Text style={[styles.dropdownText, !selectedCountry && styles.placeholderText]}>
                {selectedCountry || 'All Countries'}
              </Text>
              <ChevronDown size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={[styles.input, { borderBottomColor: getBorderColor('city') }]}
              placeholder="Enter city name"
              placeholderTextColor="#94A3B8"
              value={selectedCity}
              onChangeText={setSelectedCity}
              onFocus={() => setFocusedField('city')}
              onBlur={() => setFocusedField(null)}
            />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Demographics</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <TouchableOpacity
              style={[styles.dropdown, { borderBottomColor: getBorderColor('gender') }]}
              onPress={() => setGenderDropdownVisible(true)}
            >
              <Text style={[styles.dropdownText, !selectedGender && styles.placeholderText]}>
                {selectedGender || 'All Genders'}
              </Text>
              <ChevronDown size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age Range</Text>
            <View style={styles.ageRow}>
              <View style={styles.ageInputContainer}>
                <TextInput
                  style={[styles.ageInput, { borderBottomColor: getBorderColor('minAge') }]}
                  placeholder="Min"
                  placeholderTextColor="#94A3B8"
                  value={minAge}
                  onChangeText={(text) => {
                    const num = text.replace(/[^0-9]/g, '');
                    if (num === '' || (parseInt(num) >= 0 && parseInt(num) <= 100)) {
                      setMinAge(num);
                    }
                  }}
                  keyboardType="numeric"
                  maxLength={2}
                  onFocus={() => setFocusedField('minAge')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
              <Text style={styles.ageSeparator}>to</Text>
              <View style={styles.ageInputContainer}>
                <TextInput
                  style={[styles.ageInput, { borderBottomColor: getBorderColor('maxAge') }]}
                  placeholder="Max"
                  placeholderTextColor="#94A3B8"
                  value={maxAge}
                  onChangeText={(text) => {
                    const num = text.replace(/[^0-9]/g, '');
                    if (num === '' || (parseInt(num) >= 0 && parseInt(num) <= 100)) {
                      setMaxAge(num);
                    }
                  }}
                  keyboardType="numeric"
                  maxLength={2}
                  onFocus={() => setFocusedField('maxAge')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education / Work</Text>
          
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => handleOccupationChange('all')}
            >
              <View style={[styles.radioOuter, occupationType === 'all' && styles.radioOuterSelected]}>
                {occupationType === 'all' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>All</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => handleOccupationChange('education')}
            >
              <View style={[styles.radioOuter, occupationType === 'education' && styles.radioOuterSelected]}>
                {occupationType === 'education' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>Education</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => handleOccupationChange('work')}
            >
              <View style={[styles.radioOuter, occupationType === 'work' && styles.radioOuterSelected]}>
                {occupationType === 'work' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>Work</Text>
            </TouchableOpacity>
          </View>

          {occupationType === 'education' && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Degree Level</Text>
              <TouchableOpacity
                style={[styles.dropdown, { borderBottomColor: getBorderColor('degree') }]}
                onPress={() => setDegreeDropdownVisible(true)}
              >
                <Text style={[styles.dropdownText, !selectedDegree && styles.placeholderText]}>
                  {selectedDegree || 'All Levels'}
                </Text>
                <ChevronDown size={20} color="#64748B" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status</Text>
          
          <TouchableOpacity
            style={styles.toggleContainer}
            onPress={() => setOnlineOnly(!onlineOnly)}
          >
            <View style={[styles.toggle, onlineOnly && styles.toggleActive]}>
              <View style={[styles.toggleDot, onlineOnly && styles.toggleDotActive]} />
            </View>
            <Text style={styles.toggleLabel}>Show only online users</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={countryDropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCountryDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setCountryDropdownVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Country</Text>
            <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                style={[styles.modalOption, selectedCountry === '' && styles.modalOptionSelected]}
                onPress={() => {
                  setSelectedCountry('');
                  setCountryDropdownVisible(false);
                }}
              >
                <Text style={[styles.modalOptionText, selectedCountry === '' && styles.modalOptionTextSelected]}>
                  All Countries
                </Text>
                {selectedCountry === '' && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
              {countries.map((country) => (
                <TouchableOpacity
                  key={country}
                  style={[styles.modalOption, selectedCountry === country && styles.modalOptionSelected]}
                  onPress={() => {
                    setSelectedCountry(country);
                    setCountryDropdownVisible(false);
                  }}
                >
                  <Text style={[styles.modalOptionText, selectedCountry === country && styles.modalOptionTextSelected]}>
                    {country}
                  </Text>
                  {selectedCountry === country && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={genderDropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setGenderDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setGenderDropdownVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Gender</Text>
            <TouchableOpacity
              style={[styles.modalOption, selectedGender === '' && styles.modalOptionSelected]}
              onPress={() => {
                setSelectedGender('');
                setGenderDropdownVisible(false);
              }}
            >
              <Text style={[styles.modalOptionText, selectedGender === '' && styles.modalOptionTextSelected]}>
                All Genders
              </Text>
              {selectedGender === '' && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            {genders.map((gender) => (
              <TouchableOpacity
                key={gender}
                style={[styles.modalOption, selectedGender === gender && styles.modalOptionSelected]}
                onPress={() => {
                  setSelectedGender(gender);
                  setGenderDropdownVisible(false);
                }}
              >
                <Text style={[styles.modalOptionText, selectedGender === gender && styles.modalOptionTextSelected]}>
                  {gender}
                </Text>
                {selectedGender === gender && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={degreeDropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDegreeDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDegreeDropdownVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Degree Level</Text>
            <TouchableOpacity
              style={[styles.modalOption, selectedDegree === '' && styles.modalOptionSelected]}
              onPress={() => {
                setSelectedDegree('');
                setDegreeDropdownVisible(false);
              }}
            >
              <Text style={[styles.modalOptionText, selectedDegree === '' && styles.modalOptionTextSelected]}>
                All Levels
              </Text>
              {selectedDegree === '' && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            {degreeOptions.map((degree) => (
              <TouchableOpacity
                key={degree}
                style={[styles.modalOption, selectedDegree === degree && styles.modalOptionSelected]}
                onPress={() => {
                  setSelectedDegree(degree);
                  setDegreeDropdownVisible(false);
                }}
              >
                <Text style={[styles.modalOptionText, selectedDegree === degree && styles.modalOptionTextSelected]}>
                  {degree}
                </Text>
                {selectedDegree === degree && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearFilters}
        >
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApplyFilters}
        >
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
  },
  filterBadge: {
    backgroundColor: '#3F51B5',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  filterBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E1',
    paddingVertical: 12,
    gap: 12,
  },
  searchContainerFocused: {
    borderBottomColor: '#3F51B5',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1E293B',
  },
  dropdown: {
    borderBottomWidth: 1,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    color: '#1E293B',
  },
  placeholderText: {
    color: '#94A3B8',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 8,
  },
  ageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  ageInputContainer: {
    flex: 1,
  },
  ageInput: {
    borderBottomWidth: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1E293B',
    textAlign: 'center',
  },
  ageSeparator: {
    fontSize: 14,
    color: '#64748B',
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#3F51B5',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3F51B5',
  },
  radioLabel: {
    fontSize: 16,
    color: '#1E293B',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#CBD5E1',
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#3F51B5',
  },
  toggleDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  toggleDotActive: {
    alignSelf: 'flex-end',
  },
  toggleLabel: {
    fontSize: 16,
    color: '#1E293B',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 340,
    maxHeight: '70%',
    padding: 8,
  },
  modalScrollView: {
    maxHeight: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modalOptionSelected: {
    backgroundColor: '#EEF2FF',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#334155',
  },
  modalOptionTextSelected: {
    color: '#3F51B5',
    fontWeight: '500',
  },
  checkmark: {
    fontSize: 16,
    color: '#3F51B5',
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 24,
    paddingBottom: 40,
    backgroundColor: '#F8FAFC',
    gap: 12,
  },
  clearButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#3F51B5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
