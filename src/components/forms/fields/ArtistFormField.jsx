// ArtistField.jsx
import { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from 'lucide-react';          // lucide-react icon
import { Box, Typography } from '@mui/material';

// ---------- helpers ----------
const normalize = (value) => {
  if (!value || typeof value !== 'string') return '';
  return value.trim().toLowerCase();
};

const useAppType = () => {
  const [isArtistWeb, setIsArtistWeb] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const envValue = process.env.NEXT_PUBLIC_APP_TYPE;
    const normalizedValue = normalize(envValue);
    setIsArtistWeb(normalizedValue === 'artist web');
  }, []);

  return isArtistWeb;
};

// ---------- component ----------
export const ArtistFormField = ({ language = 'EN' }) => {
  const isArtistWeb = useAppType();
  const { control, setValue } = useFormContext();

  // auto-fill when in artist-web mode
  useEffect(() => {
    if (!isArtistWeb) return;
    const fallback = '';
    const defaultVal = (() => {
      if (typeof window === 'undefined') return fallback;
      const env = process.env.NEXT_PUBLIC_APP_TYPE || '';
      if (normalize(env) !== 'artist web') return fallback;
      return language === 'CN'
        ? process.env.NEXT_PUBLIC_ARTIST_NAME_CN || fallback
        : process.env.NEXT_PUBLIC_ARTIST_NAME_EN || fallback;
    })();
    if (defaultVal) setValue('artist', defaultVal);
  }, [isArtistWeb, language, setValue]);

  // hide field completely for artist-web
  if (isArtistWeb) return null;

  // normal input otherwise
  return (
    <Box mb={2}>
      <Typography variant="subtitle2" mb={1}>
        Artist
      </Typography>
      <Controller
        name="artist"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Enter artist name"
            className="w-full"
          />
        )}
      />
    </Box>
  );
};