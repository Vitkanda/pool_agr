import React from "react";
import Head from "next/head";

import PoolForm from "@/slices/pool-details/PoolForm";
import AdminLayout from "@/slices/auth/AdminLayout";

const AddPoolPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Добавление нового бассейна | Админ-панель</title>
        <meta
          name="description"
          content="Добавление нового детского бассейна в каталог"
        />
      </Head>

      <AdminLayout title="Добавление нового бассейна">
        <PoolForm />
      </AdminLayout>
    </>
  );
};

export default AddPoolPage;