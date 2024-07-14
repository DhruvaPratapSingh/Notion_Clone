"use client";

import { SettingsModal } from "@/app/(main)/_components/modals/settings-modal";
import { useEffect, useState } from "react";



export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* <CoverImageModal /> */}
      <SettingsModal />
    </>
  );
};