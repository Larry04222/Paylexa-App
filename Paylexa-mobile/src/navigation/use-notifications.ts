import { useEffect, useState } from "react";

type Notification = {
  id: string;
  message: string;
  receivedAt: Date;
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications([
      {
        id: "seed",
        message: "Welcome to the Paylexa mobile preview",
        receivedAt: new Date(),
      },
    ]);
  }, []);

  return { notifications };
};
