import React, { useEffect, useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styled from 'styled-components';
import { ThemedText } from '../ThemedText';
import ButtonText from './ButtonText';
import { useThemeColor } from '@/src/hooks/useThemeColor';

interface Option {
  value: string | number;
  label: string;
}

export interface FormField {
  name: string;
  label: string;
  placeholder?: string;
  type: 'text' | 'number' | 'select' | 'password' | 'longText';
  options?: Option[];
  value?: string | number;
}

interface DynamicFormProps {
  formStructure: FormField[];
  label: string;
  onSubmit: (formData: { [key: string]: any }) => void;
}

const renderFormField = (
  colors: { borderColor: string; placeHolderColor: string },
  field: FormField,
  index: number,
  handleChange: (name: string, value: any) => void,
  values: { [key: string]: any }
) => {
  const fieldValue = values[field.name] ?? field.value ?? ''; // State value > Initial value > Empty

  switch (field.type) {
    case 'text':
    case 'number':
    case 'password':
      return (
        <StyledInputContainer key={index}>
          <StyledLabel>{field.label}</StyledLabel>
          <StyledInput
            borderColor={colors.borderColor}
            placeholder={field.placeholder ?? field.label}
            placeholderTextColor={colors.placeHolderColor}
            secureTextEntry={field.type === 'password'}
            keyboardType={field.type === 'number' ? 'numeric' : 'default'}
            value={fieldValue}
            onChangeText={(value) => handleChange(field.name, value)}
          />
        </StyledInputContainer>
      );
    case 'longText':
      return (
        <StyledInputContainer key={index}>
          <StyledLabel>{field.label}</StyledLabel>
          <StyledInput
            borderColor={colors.borderColor}
            placeholder={field.placeholder ?? field.label}
            placeholderTextColor={colors.placeHolderColor}
            secureTextEntry={false}
            multiline={true}
            numberOfLines={4}
            value={fieldValue}
            onChangeText={(value) => handleChange(field.name, value)}
          />
        </StyledInputContainer>
      );
    case 'select':
      return (
        <StyledInputContainer key={index}>
          <StyledLabel>{field.label}</StyledLabel>
          <StyledPicker
            borderColor={colors.borderColor}
            selectedValue={fieldValue}
            onValueChange={(value) => handleChange(field.name, value)}
          >
            {field.options?.map((option, i) => (
              <StyledPickerItem
                key={i}
                label={option.label}
                value={option.value}
              />
            ))}
          </StyledPicker>
        </StyledInputContainer>
      );
    default:
      return null;
  }
};

export const DynamicForm: React.FC<DynamicFormProps> = ({
  formStructure,
  label,
  onSubmit,
}) => {
  const colors = {
    borderColor: useThemeColor({}, 'placeholder'),
    placeHolderColor: useThemeColor({}, 'placeholder'),
  };

  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});

  // Initialize form values from the structure
  useEffect(() => {
    const initialValues = formStructure.reduce<{ [key: string]: any }>(
      (acc, field) => {
        acc[field.name] = field.value ?? ''; // Use initial value or an empty string
        return acc;
      },
      {} // Initial value of the accumulator
    );
    setFormValues(initialValues);
  }, [formStructure]);

  const handleChange = (name: string, value: any) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formValues);
  };

  return (
    <KeyboardView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StyledForm>
        {formStructure.map((field, index) =>
          renderFormField(colors, field, index, handleChange, formValues)
        )}
        <ButtonContainer>
          <StyledButton label={label} onPress={handleSubmit} />
        </ButtonContainer>
      </StyledForm>
    </KeyboardView>
  );
};

const KeyboardView = styled(KeyboardAvoidingView)`
  flex: 1;
`;

const Scroll = styled(ScrollView)`
  flexgrow: 1;
`;

const StyledForm = styled(View)`
  flex: 1;
  padding: 16px;
  width: 340px;
`;

const ButtonContainer = styled(View)`
  margin-top: 16px;
  justify-content: center;
  align-items: center;
`;

const StyledInputContainer = styled(View)`
  margin-bottom: 16px;
`;

const StyledLabel = styled(Text)`
  font-size: 16px;
  margin-bottom: 8px;
  color: #333;
`;

const StyledInput = styled(TextInput)<{ borderColor: string }>`
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 5px;
  padding: 8px;
  font-size: 16px;
`;

const StyledPicker = styled(Picker)<{ borderColor: string }>`
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 5px;
  padding: 8px;
  font-size: 16px;
`;

const StyledPickerItem = Picker.Item;

const StyledButton = styled(ButtonText)`
  padding: 16px;
  border-radius: 5px;
  align-items: center;
`;

export default DynamicForm;
