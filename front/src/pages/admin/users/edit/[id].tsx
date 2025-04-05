// src/pages/admin/users/edit/[id].tsx
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AdminLayout from '@/slices/auth/AdminLayout';
import UserForm from '@/slices/users/UserForm';

const EditUserPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return null; // Ожидаем загрузки ID из query параметров
  }

  return (
    <>
      <Head>
        <title>Редактирование пользователя | Админ-панель</title>
        <meta name="description" content="Редактирование данных пользователя системы" />
      </Head>

      <AdminLayout title="Редактирование пользователя">
        <UserForm editMode userId={id as string} />
      </AdminLayout>
    </>
  );
};

export default EditUserPage;