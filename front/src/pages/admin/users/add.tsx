// src/pages/admin/users/add.tsx
import React from 'react';
import Head from 'next/head';
import AdminLayout from '@/slices/auth/AdminLayout';
import UserForm from '@/slices/users/UserForm';

const AddUserPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Добавление пользователя | Админ-панель</title>
        <meta name="description" content="Добавление нового пользователя в систему" />
      </Head>

      <AdminLayout title="Добавление пользователя">
        <UserForm />
      </AdminLayout>
    </>
  );
};

export default AddUserPage;