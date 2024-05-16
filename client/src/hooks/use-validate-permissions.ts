import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { useEffect, useMemo } from "react";

const useValidatePermissions = (requiredPermissions: string[]) => {
  const { status, data } = useSession();

  const permitted = useMemo(() => {
    return requiredPermissions.every((permission) => {
      // @ts-ignore
      const roles = data?.roles ?? [];
      return roles.includes(permission);
    });
  }, [requiredPermissions]);

  return [status === "loading", permitted];
};

export default useValidatePermissions;
