"use client";
import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from "@/components/contexts/LanguageContext";
import ReorderLayout from "@/components/layouts/ReorderLayout";
import { fairReorderConfig } from "@/components/configs/reorderConfigs"; // Fair config

function FairReorderManager() {
  const { isCn } = useContext(LanguageContext);
  
  const [fairs, setFairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch fairs from API
  useEffect(() => {
    const fetchFairs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/fair/reorder');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setFairs(data);
      } catch (err) {
        console.error('Error fetching fairs:', err);
        setError('Failed to load fairs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFairs();
  }, []);

  // Handle edit
  const handleEdit = (id) => {
    window.location.href = `/manager/fair/${id}/edit`;
  };

  // Save reordered fairs to database
  const handleSave = async (newFairs) => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);
      
      const orderedIds = newFairs.map(fair => fair._id || fair.id);
      
      const response = await fetch('/api/fair/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderedIds }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      if (result.success) {
        setSuccess(true);
        setFairs(newFairs.map((fair, index) => ({
          ...fair,
          order: String(index + 1)
        })));
        
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error(result.error || 'Failed to save order');
      }
    } catch (err) {
      console.error('Error saving fair order:', err);
      setError('Failed to save order. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ReorderLayout
      config={fairReorderConfig}
      data={fairs}
      onSave={handleSave}
      onEdit={handleEdit}
      loading={loading}
      saving={saving}
      error={error}
      success={success}
    />
  );
}

export default FairReorderManager;