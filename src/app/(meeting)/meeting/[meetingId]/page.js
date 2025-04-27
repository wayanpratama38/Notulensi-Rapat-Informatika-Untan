import { Field, Fieldset, Input, Label, Legend, Select, Textarea } from '@headlessui/react'

export default function DetailMeeting() {
    return (
        <div className="flex bg-white items-center justify-center max-w-[400px]">
            <Fieldset>
                <Legend className="flex justify-center text-lg font-bold">Rapat Tim IT</Legend>
                <Field className="flex">
                    <Label className="block">Street address</Label>
                    <Input className="mt-1 block" name="address" />
                </Field>
                <Field className="flex gap-1">
                    <Label className="block">Country</Label>
                    <Select className="mt-1 block bg-gray-300" name="country">
                    <option>Canada</option>
                    <option>Mexico</option>
                    <option>United States</option>
                    </Select>
                </Field>
                <Field>
                    <Label className="block">Delivery notes</Label>
                    <Textarea className="mt-1 block" name="notes" />
                </Field>
            </Fieldset>
        </div>
    )
}