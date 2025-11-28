'use client';

import {useState} from 'react';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {User} from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';

const profileSchema = z.object({
  height: z.coerce
    .number({invalid_type_error: 'Please enter a number'})
    .positive({message: 'Height must be positive'})
    .optional()
    .or(z.literal('')),
  weight: z.coerce
    .number({invalid_type_error: 'Please enter a number'})
    .positive({message: 'Weight must be positive'})
    .optional()
    .or(z.literal('')),
});

type UserProfile = {
  height: number | null;
  weight: number | null;
};

interface UserProfileSheetProps {
  userProfile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

export function UserProfileSheet({userProfile, onSave}: UserProfileSheetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      height: userProfile.height ?? '',
      weight: userProfile.weight ?? '',
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    onSave({
      height: values.height ? Number(values.height) : null,
      weight: values.weight ? Number(values.weight) : null,
    });
    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
          <span className="sr-only">Open Profile</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Profile</SheetTitle>
          <SheetDescription>
            This information helps personalize your recommendations. It's optional.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="height"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Height (cm)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 175" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 70" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save Changes</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

    