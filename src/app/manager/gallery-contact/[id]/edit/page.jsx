"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GalleryContactEditForm from "@/components/forms/GalleryContactEditForm";
import LoadingLayer from "@/components/animations/LoadingLayer";
import AlertInfo from '@/components/alerts/AlertInfo';

export default function EditGalleryContactPage({ params }) {
  const router = useRouter();
  const [galleryContact, setGalleryContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id; // Extract the `id` from the unwrapped params object

  // 从 API 获取数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/gallery-contact/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setGalleryContact(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]); // 当 id 变化时重新获取

  // 加载状态
  if (isLoading) {
    return <LoadingLayer isLoading={isLoading} />;
  }

  // 错误状态
  if (error) {
    return (
      <AlertInfo
        message={error}
        subMessage=""
        buttonText="Back to Gallery Contacts"
        onBack={() => router.push("/manager/gallery-contact")}
      />
    );
  }

  // 未找到数据
  if (!galleryContact) {
    return (
      <AlertInfo
        message="Gallery Contact not found."
        subMessage=""
        buttonText="Back to Gallery Contacts"
        onBack={() => router.push("/manager/gallery-contact")}
      />
    );
  }

  // 渲染编辑表单
  return (
    <div style={{ padding: '40px' }}>
      <GalleryContactEditForm item={galleryContact} id={id} />
    </div>
  );
}