"use client";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import { LanguageContext } from "@/components/contexts/LanguageContext";
import FairEditForm from "@/components/forms/FairEditForm ";
import LoadingLayer from "@/components/animations/LoadingLayer";
import AlertInfo from "@/components/alerts/AlertInfo";
import { fairConfig } from "@/components/configs/fairConfig";

export default function EditFairPage() {
  const params = useParams();
  const { isCn } = useContext(LanguageContext);
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fairId = params?.id;

  useEffect(() => {
    if (!fairId) {
      console.error('[DEBUG EditFairPage] ❌ No fairId from params');
      setError("No fair ID provided");
      setIsLoading(false);
      return;
    }

    const loadFairData = async () => {
      try {
        
        // First, try to get data from sessionStorage (from manager page)
        const sessionKey = `fair_edit_${fairId}`;
        const cachedData = sessionStorage.getItem(sessionKey);
        
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setItem(parsedData);
          setIsLoading(false);
          
          // Clean up sessionStorage after use
          sessionStorage.removeItem(sessionKey);
          return;
        }

        // If no cached data, fetch from API
        const apiUrl = `${fairConfig.api.endpoints.list}/${fairId}`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch fair: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data) {
          setItem(data);
        } else {
          throw new Error("No fair data received");
        }
      } catch (error) {
        console.error('[DEBUG EditFairPage] ❌ Error:', error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadFairData();
  }, [fairId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingLayer isLoading={true} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <AlertInfo
          message={`Error loading fair: ${error}`}
          subMessage="Please try again or go back to the fair list."
          buttonText="Back to List"
          onBack={() => window.location.href = "/manager/fair"}
        />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <AlertInfo
          message="Fair not found"
          subMessage="The requested fair could not be found."
          buttonText="Back to List"
          onBack={() => window.location.href = "/manager/fair"}
        />
      </div>
    );
  }

  return (
    <FairEditForm item={item} id={fairId} key={isCn ? "cn" : "en"} />
  );
}