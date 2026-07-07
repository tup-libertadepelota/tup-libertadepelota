import React, { useRef, useState } from 'react';
import { Avatar, Button, Divider, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { getUserProfile, saveUserProfile } from '../services/userProfileService.js';

const getInitialProfile = (email) => {
  const profile = getUserProfile(email);

  return {
    birthDate: profile.birthDate,
    address: profile.address,
    phones: Array.isArray(profile.phones) && profile.phones.length ? profile.phones : [''],
  };
};

const inputSx = {
  '& .MuiInputBase-root': {
    color: '#e5e7eb',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  '& .MuiInputLabel-root': {
    color: '#9ca3af',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255,255,255,0.12)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0,255,156,0.45)',
  },
  "& input[type='date']::-webkit-calendar-picker-indicator": {
    filter: 'invert(1)',
    cursor: 'pointer',
  },
};

const ADDRESS_MIN_LENGTH = 2;
const ADDRESS_MAX_LENGTH = 128;
const PHONE_MIN_LENGTH = 2;
const PHONE_MAX_LENGTH = 15;
const PHONE_REGEX = /^\d{2,15}$/;

export default function AccountSettings() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const initialProfile = getInitialProfile(user?.email);
  const [birthDate, setBirthDate] = useState(initialProfile.birthDate);
  const [address, setAddress] = useState(initialProfile.address);
  const [phones, setPhones] = useState(initialProfile.phones);
  const [errors, setErrors] = useState({});
  const birthDateInputRef = useRef(null);
  const today = new Date().toISOString().split('T')[0];

  const userName = user?.name || t('settings.defaultUser');
  const userEmail = user?.email || t('settings.noEmail');

  const userInitials = userName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  const handlePhoneChange = (index, value) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, PHONE_MAX_LENGTH);
    setPhones((currentPhones) =>
      currentPhones.map((phone, phoneIndex) => (phoneIndex === index ? digitsOnly : phone))
    );
  };

  const handleAddPhone = () => {
    setPhones((currentPhones) => [...currentPhones, '']);
  };

  const handleRemovePhone = (index) => {
    setPhones((currentPhones) => currentPhones.filter((_, phoneIndex) => phoneIndex !== index));
  };

  const validateForm = () => {
    const nextErrors = {};
    const trimmedAddress = address.trim();

    if (trimmedAddress.length < ADDRESS_MIN_LENGTH || trimmedAddress.length > ADDRESS_MAX_LENGTH) {
      nextErrors.address = t('accountSettings.addressLengthError', {
        min: ADDRESS_MIN_LENGTH,
        max: ADDRESS_MAX_LENGTH,
      });
    }

    if (birthDate && birthDate > today) {
      nextErrors.birthDate = t('accountSettings.birthDateMaxError');
    }

    phones.forEach((phone, index) => {
      if (!PHONE_REGEX.test(phone)) {
        nextErrors[`phone-${index}`] = t('accountSettings.phoneLengthError', {
          min: PHONE_MIN_LENGTH,
          max: PHONE_MAX_LENGTH,
        });
      }
    });

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    saveUserProfile(user?.email, {
      birthDate,
      address: address.trim(),
      phones,
    });

    navigate('/settings');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#00ff9c]">{t('accountSettings.title')}</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-6"
      >
        <div className="flex items-center gap-5">
          <Avatar
            src={user?.picture || undefined}
            sx={{
              width: 72,
              height: 72,
              bgcolor: 'var(--color-primary)',
              fontSize: '1.75rem',
              fontWeight: 700,
            }}
          >
            {userInitials}
          </Avatar>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold text-white">{userName}</span>
          <span className="text-sm text-gray-400">{userEmail}</span>
          <span className="text-xs text-gray-500">{t('accountSettings.readonlyInfo')}</span>
        </div>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">
            {t('accountSettings.birthDate')}
          </label>

          <TextField
            type="date"
            inputRef={birthDateInputRef}
            onClick={() => birthDateInputRef.current?.showPicker?.()}
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
            error={Boolean(errors.birthDate)}
            helperText={errors.birthDate}
            fullWidth
            sx={inputSx}
            slotProps={{
              htmlInput: {
                max: today,
              },
            }}
          />
        </div>

        <TextField
          label={t('accountSettings.address')}
          type="text"
          value={address}
          onChange={(event) => setAddress(event.target.value.slice(0, ADDRESS_MAX_LENGTH))}
          error={Boolean(errors.address)}
          helperText={errors.address}
          fullWidth
          sx={inputSx}
          slotProps={{
            htmlInput: {
              minLength: ADDRESS_MIN_LENGTH,
              maxLength: ADDRESS_MAX_LENGTH,
            },
          }}
        />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">{t('accountSettings.phones')}</span>

            <Button
              type="button"
              variant="outlined"
              onClick={handleAddPhone}
              startIcon={<AddIcon />}
              sx={{
                textTransform: 'none',
                color: '#00ff9c',
                borderColor: 'rgba(0,255,156,0.45)',
              }}
            >
              <span>{t('accountSettings.addPhone')}</span>
            </Button>
          </div>

          {phones.map((phone, index) => (
            <div key={index} className="flex gap-3">
              <TextField
                label={`${t('accountSettings.phone')} ${index + 1}`}
                value={phone}
                onChange={(event) => handlePhoneChange(index, event.target.value)}
                error={Boolean(errors[`phone-${index}`])}
                helperText={errors[`phone-${index}`]}
                fullWidth
                sx={inputSx}
                slotProps={{
                  htmlInput: {
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    minLength: PHONE_MIN_LENGTH,
                    maxLength: PHONE_MAX_LENGTH,
                  },
                }}
              />

              {phones.length > 1 && (
                <Button
                  type="button"
                  color="error"
                  onClick={() => handleRemovePhone(index)}
                  sx={{ minWidth: 48 }}
                >
                  <DeleteOutlineIcon />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={() => navigate('/settings')}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: '#9ca3af',
              borderColor: 'rgba(156,163,175,0.45)',
              '&:hover': {
                borderColor: '#9ca3af',
                backgroundColor: 'rgba(156,163,175,0.08)',
              },
            }}
          >
            <span>{t('accountSettings.cancel')}</span>
          </Button>

          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              bgcolor: 'var(--color-primary)',
              '&:hover': {
                bgcolor: 'var(--color-primary-soft)',
              },
            }}
          >
            <span>{t('accountSettings.saveChanges')}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
