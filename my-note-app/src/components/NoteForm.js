import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { NoteSchema } from '../utils/validation';

export default function NoteForm({ initialValues, onSubmit, submitLabel = 'Lưu ghi chú' }) {
    return (
        <Formik
            initialValues={initialValues || { title: '', content: '' }}
            validationSchema={NoteSchema}
            onSubmit={onSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty }) => (
                <View style={styles.form}>
                    <Text style={styles.label}>Tiêu đề *</Text>
                    <TextInput
                        style={[styles.input, touched.title && errors.title && styles.inputError]}
                        placeholder="Nhập tiêu đề..."
                        placeholderTextColor="#999"
                        value={values.title}
                        onChangeText={handleChange('title')}
                        onBlur={handleBlur('title')}
                    />
                    {touched.title && errors.title && (
                        <Text style={styles.errorText}>{errors.title}</Text>
                    )}

                    <Text style={styles.label}>Nội dung *</Text>
                    <TextInput
                        style={[styles.input, styles.textArea, touched.content && errors.content && styles.inputError]}
                        placeholder="Nhập nội dung ghi chú..."
                        placeholderTextColor="#999"
                        value={values.content}
                        onChangeText={handleChange('content')}
                        onBlur={handleBlur('content')}
                        multiline
                        numberOfLines={6}
                    />
                    {touched.content && errors.content && (
                        <Text style={styles.errorText}>{errors.content}</Text>
                    )}

                    <TouchableOpacity
                        style={[styles.button, (!isValid || !dirty) && styles.buttonDisabled]}
                        onPress={handleSubmit}
                        disabled={!isValid || !dirty}
                    >
                        <Text style={styles.buttonText}>{submitLabel}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    form: {
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2d3436',
        marginBottom: 6,
        marginTop: 10,
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#dfe6e9',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#2d3436',
    },
    textArea: {
        minHeight: 120,
        textAlignVertical: 'top',
    },
    inputError: {
        borderColor: '#d63031',
    },
    errorText: {
        color: '#d63031',
        fontSize: 13,
        marginTop: 4,
    },
    button: {
        backgroundColor: '#0984e3',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    },
    buttonDisabled: {
        backgroundColor: '#b2bec3',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});