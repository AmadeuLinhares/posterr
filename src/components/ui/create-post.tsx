import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "./textarea";
import z, { ZodError } from "zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "./label";
import { useQueryClient } from "@tanstack/react-query";
import type { UserResponse } from "@/queries/useFetchProfile";
import { toast } from "sonner";
import { useCreatePost } from "@/queries/useCreatePost";
import { Spinner } from "./spinner";
import { v7 } from "uuid";
import { tv, type VariantProps } from "tailwind-variants";
import clsx from "clsx";
import { useCheckCreatePostsAvailable } from "@/queries/useCheckCreatePostsAvailable";
const MAX_LENGHT_POST = 777;

const urlSchemaParams = z.object({
  parentId: z.string().optional(),
  isQuote: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  isPosting: z
    .string()
    .transform((val) => val === "true")
    .optional(),
});

const keys = ["parentId", "isQuote", "isPosting"];

const ButtonVariants = tv({
  base: "rounded-full w-[50px] h-[50px]",
  variants: {
    variant: {
      primary: "bg-gray-900 text-gray-100",
      secondary: "bg-gray-100 text-gray-900",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type CreatePostProps = VariantProps<typeof ButtonVariants>;

export function CreatePost({ variant = "primary" }: CreatePostProps) {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useCreatePost();
  const [searchParams, setSearchParams] = useSearchParams();
  const parsed = urlSchemaParams.parse(Object.fromEntries(searchParams));
  const [open, setOpen] = useState(false);
  const userData = queryClient.getQueryData<UserResponse>(["profile"]);
  const { data: allowedToCreate } = useCheckCreatePostsAvailable({
    userId: userData?.id,
  });

  const isQuote = useMemo(
    () => Boolean(!!parsed?.isQuote && parsed?.parentId),
    [parsed],
  );
  const isRepost = useMemo(
    () => Boolean(!parsed?.isQuote && parsed?.parentId),
    [parsed],
  );

  const makeContentSchema = (opts: { isQuote: boolean; isRepost: boolean }) =>
    z
      .object({
        content: z.string().max(MAX_LENGHT_POST).optional(),
      })
      .superRefine((data, ctx) => {
        // Require content if it's a quote OR a regular post (i.e., not a repost)
        if (opts.isQuote || !opts.isRepost) {
          if (!data.content || data.content.trim().length < 2) {
            ctx.addIssue({
              code: "custom",
              path: ["content"],
              message: "Content is required for quotes and regular posts",
            });
          }
        }
      });

  const contentSchema = useMemo(
    () => makeContentSchema({ isQuote, isRepost }),
    [isQuote, isRepost],
  );

  const makeCreatePostSchema = (opts: {
    isQuote: boolean;
    isRepost: boolean;
  }) =>
    z
      .object({
        owner_id: z.uuidv7(),
        avatar: z.string(),
        parent_id: z.string().nullable().default(null),
        isQuote: z.boolean().default(false),
        userName: z.string(),
        content: z.string().max(MAX_LENGHT_POST),
      })
      .superRefine((data, ctx) => {
        if (opts.isQuote || !opts.isRepost) {
          if (!data.content || data.content.trim().length < 2) {
            ctx.addIssue({
              code: "custom",
              path: ["content"],
              message: "Content is required for quotes and regular posts",
            });
          }
        }
      });

  const schema = useMemo(
    () => makeCreatePostSchema({ isQuote, isRepost }),
    [isQuote, isRepost],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<z.infer<ReturnType<typeof makeContentSchema>>>({
    resolver: zodResolver(contentSchema),
  });

  const postMessage = watch("content");

  const title = useMemo(() => {
    if (isQuote) return "Quote post";
    if (isRepost) return "Respost";
    return "Create your post";
  }, [isQuote, isRepost]);

  const subtitle = useMemo(() => {
    if (isQuote) return "Quote this post, your friends are waiting... 😉";
    if (isRepost) return "If you like this post, repost it 👌";
    return "Share your thoughts and ideas with your friends 😎";
  }, [isQuote, isRepost]);

  const buttonLabel = useMemo(() => {
    if (isQuote) return "Quote";
    if (isRepost) return "Repost";
    return "Post";
  }, [isQuote, isRepost]);

  const removeParams = useCallback(
    (keys: string[]) => {
      const next = new URLSearchParams(searchParams);

      keys.forEach((key) => next.delete(key));

      setSearchParams(next);
    },
    [searchParams, setSearchParams],
  );
  const handleChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        removeParams(keys);
        reset();
      }
      setOpen(isOpen);
    },
    [removeParams, reset],
  );

  const handleCreate = useCallback(
    async (data: z.Infer<typeof contentSchema>) => {
      if (!allowedToCreate?.allowed) {
        handleChange(false);
        return toast.error(
          "U already created 5 posts today. Maximum number of posts exceeded ",
        );
      }

      try {
        const body = schema.parse({
          avatar: userData?.avatar,
          content: data.content,
          owner_id: userData?.id,
          userName: userData?.userName,
          isQuote: parsed.isQuote,
          parent_id: parsed.parentId,
        });

        await mutateAsync({
          ...body,
          created_at: new Date().toISOString(),
          id: v7(),
        });
      } catch (err) {
        if (err instanceof ZodError) {
          toast.error(String(err.message));
        }
      } finally {
        handleChange(false);
      }
    },
    [
      allowedToCreate?.allowed,
      handleChange,
      mutateAsync,
      parsed.isQuote,
      parsed.parentId,
      schema,
      userData?.avatar,
      userData?.id,
      userData?.userName,
    ],
  );

  useEffect(() => {
    setOpen(!!parsed.isPosting);
  }, [parsed.isPosting]);

  return (
    <div style={{ position: "fixed", bottom: 10, zIndex: 9, right: 10 }}>
      <Drawer open={open} onOpenChange={handleChange}>
        <DrawerTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            className={clsx(ButtonVariants({ variant: variant }))}
          >
            <Plus />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <form onSubmit={handleSubmit(handleCreate)}>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>{title}</DrawerTitle>
                <DrawerDescription>{subtitle}</DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                {!isRepost && (
                  <div className="space-x-2 grid gap-2">
                    <Textarea
                      {...register("content")}
                      placeholder="Type your message here."
                    />
                    <div className="flex justify-end items-center">
                      <Label className="text-gray-500 text-sm italic">
                        {postMessage?.length ?? 0} / {MAX_LENGHT_POST}
                      </Label>
                    </div>
                    {!!errors.content && (
                      <div>
                        <Label className="text-red-600">
                          {errors.content.message}
                        </Label>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <DrawerFooter>
                {isPending ? (
                  <div className="flex justify-center items-center">
                    <Spinner />
                  </div>
                ) : (
                  <>
                    <Button type="submit">{buttonLabel}</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </>
                )}
              </DrawerFooter>
            </div>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
