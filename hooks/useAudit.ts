import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiHandler } from "@/lib/api";
import { AuditDetailsState } from "@/types/audit";
import { AUDIT_REPORT, UPLOAD_PDF } from "@/utils/constants";

export const useAudit = () => {
  return useQuery<AuditDetailsState[]>({
    queryKey: ["create-report"],
    queryFn: () => apiHandler<AuditDetailsState[]>("/create-report"),
  });
};

export const useAuditPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<AuditDetailsState>) =>
      apiHandler<AuditDetailsState>(AUDIT_REPORT, {
        method: "POST",
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AUDIT_REPORT] });
    },
  });
};

export const usePdfUpload = () => {
  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      return apiHandler<{ fileId: string; data: { file_url: string } }>(
        UPLOAD_PDF,
        {
          method: "POST",
          body: formData,
        }
      );
    },
  });
};

// export const useUpdatePost = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (post: Post) =>
//       apiHandler<Post>(`/posts/${post.id}`, { method: 'PUT', body: post }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['posts'] });
//     },
//   });
// };

// export const useDeletePost = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (id: number) =>
//       apiHandler<void>(`/posts/${id}`, { method: 'DELETE' }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['posts'] });
//     },
//   });
// };
