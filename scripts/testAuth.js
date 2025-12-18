const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const API_BASE_URL = 'http://localhost:5001/api';

const testAuth = async () => {
    try {
        console.log('🧪 Starting Authentication Test...\n');

        // Test data
        const testUser = {
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@test.com',
            phone: '1234567890',
            password: 'testpass123'
        };

        console.log('📝 Testing Registration...');
        
        // Test Registration
        try {
            const signupResponse = await axios.post(`${API_BASE_URL}/signup`, testUser);
            console.log('✅ Registration successful:', signupResponse.data.message);
            console.log('   User ID:', signupResponse.data.data.id);
            console.log('   Email:', signupResponse.data.data.email);
        } catch (error) {
            console.log('❌ Registration failed:', error.response?.data?.message || error.message);
            return;
        }

        console.log('\n🔐 Testing Login...');
        
        // Test Login
        try {
            const loginResponse = await axios.post(`${API_BASE_URL}/login`, {
                email: testUser.email,
                password: testUser.password
            });
            console.log('✅ Login successful:', loginResponse.data.message);
            console.log('   User ID:', loginResponse.data.data.id);
            console.log('   Name:', loginResponse.data.data.firstname, loginResponse.data.data.lastname);
            console.log('   Role:', loginResponse.data.data.role);
        } catch (error) {
            console.log('❌ Login failed:', error.response?.data?.message || error.message);
            return;
        }

        console.log('\n🔒 Testing Wrong Password...');
        
        // Test Wrong Password
        try {
            await axios.post(`${API_BASE_URL}/login`, {
                email: testUser.email,
                password: 'wrongpassword'
            });
            console.log('❌ Security issue: Login succeeded with wrong password!');
        } catch (error) {
            console.log('✅ Security working: Wrong password rejected -', error.response?.data?.message);
        }

        console.log('\n🎉 All authentication tests completed successfully!');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
};

// Run the test
testAuth();