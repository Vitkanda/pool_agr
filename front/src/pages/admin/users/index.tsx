// src/pages/admin/users/index.tsx
import React from "react";
import Head from "next/head";
import AdminLayout from "@/slices/auth/AdminLayout";
import UsersList from "@/slices/users/UsersList";

const UsersPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Управление пользователями | Админ-панель</title>
        <meta
          name="description"
          content="Управление пользователями системы бассейнов"
        />
      </Head>

      <AdminLayout title="Пользователи">
        <UsersList />
      </AdminLayout>
    </>
  );
};

export default UsersPage;
