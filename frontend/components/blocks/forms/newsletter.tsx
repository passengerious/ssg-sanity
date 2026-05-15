"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SectionContainer from "@/components/ui/section-container";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { stegaClean } from "next-sanity";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

type FormNewsletterProps = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "form-newsletter" }
>;

export default function FormNewsletter({
  padding,
  colorVariant,
  consentText,
  buttonText,
}: FormNewsletterProps) {
  const newsletterActionUrl = process.env.NEXT_PUBLIC_NEWSLETTER_ACTION_URL;
  const isNewsletterEnabled = Boolean(newsletterActionUrl);

  // form validation schema
  const formSchema = z.object({
    email: z
      .string()
      .min(1, {
        message: "Please enter your email",
      })
      .email({
        message: "Please enter a valid email",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit() {
    form.setError("email", {
      type: "disabled",
      message:
        "Підписка тимчасово недоступна. Ми підключимо статично-сумісний сервіс перед запуском.",
    });
  }

  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      <Form {...form}>
        <form
          action={newsletterActionUrl || undefined}
          className="pt-8"
          method={isNewsletterEnabled ? "post" : undefined}
          onSubmit={isNewsletterEnabled ? undefined : form.handleSubmit(onSubmit)}
        >
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email для підписки</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="email"
                      disabled={!isNewsletterEnabled}
                      required={isNewsletterEnabled}
                      type="email"
                      placeholder="Введіть вашу електронну пошту"
                      // ignore 1 Password autofill
                      data-1p-ignore
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="h-9"
              disabled={!isNewsletterEnabled}
              size="sm"
              type="submit"
            >
              {buttonText}
            </Button>
          </div>
          {!isNewsletterEnabled ? (
            <p className="mt-3 text-xs text-muted-foreground" role="status">
              Підписка вимкнена для статичного MVP до вибору зовнішнього сервісу.
            </p>
          ) : null}
          {consentText && <p className="mt-4 text-xs">{consentText}</p>}
        </form>
      </Form>
    </SectionContainer>
  );
}
