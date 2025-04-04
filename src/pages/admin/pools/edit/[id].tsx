import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import AdminLayout from "@/slices/auth/AdminLayout";
import PoolForm from "@/slices/pool-details/PoolForm";
import { allPools } from "@/lib/allPools";

const EditPoolPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // Получаем информацию о редактируемом бассейне
  const pool = allPools.find((p) => p.id === id);

  if (!id) {
    return null; // Ожидаем загрузки ID из query параметров
  }

  return (
    <>
      <Head>
        <title>Редактирование бассейна | Админ-панель</title>
        <meta
          name="description"
          content="Редактирование информации о детском бассейне"
        />
      </Head>

      <AdminLayout
        title={`Редактирование: ${
          pool?.properties.CompanyMetaData.name || "Бассейн"
        }`}
      >
        <PoolForm editMode poolId={id as string} />
      </AdminLayout>
    </>
  );
};

export default EditPoolPage;
