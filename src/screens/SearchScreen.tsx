import {ErrorMessage, Field, Form, Formik} from 'formik';
import React from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {THEME} from '../theme';
import * as yup from 'yup';
import {AppTextBold} from '../ui/AppTextBold';
import {AppText} from '../ui/AppText';
import Icon from 'react-native-vector-icons/Feather';

export const SearchScreen: React.FunctionComponent = () => {
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('City name is required')
      .min(3, 'At least 3 letters')
      .matches(/^[a-zA-Z ]*$/, {message: 'Only letters'}),
  });

  return (
    <ScrollView style={styles.root}>
      <View style={styles.block}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{name: ''}}
          onSubmit={values => console.log(values)}>
          {({handleChange, handleSubmit, values, errors, isValid}) => (
            <View style={styles.form}>
              <View style={{width: '90%', position: 'relative'}}>
                <TextInput
                  placeholder="Enter city"
                  style={styles.textInput}
                  onChangeText={handleChange('name')}
                  value={values.name}
                />
                {errors.name && (
                  <AppText style={styles.errorMessage}>{errors.name}</AppText>
                )}
              </View>
              <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
                <Icon name="search" size={20} color={THEME.COLOR_GRAY} />
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: THEME.COLOR_GRAY_LIGHT,
  },
  block: {
    backgroundColor: THEME.COLOR_WHITE,
    padding: 15,
    marginBottom: 5,
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    height: 40,
    maxWidth: '100%',

    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLOR_GRAY,
  },
  errorMessage: {
    fontSize: 12,
    color: 'red',
    position: 'absolute',
    top: -10,
    left: 2,
  },
});
