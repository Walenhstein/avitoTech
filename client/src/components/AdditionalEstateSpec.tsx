import { NumberInput, Select, TextInput } from "@mantine/core";

export default function AdditionalEstateSpec(form, getWarningStyle) {
    return (
        <>
            <Select label='Тип' data={[
                {value: 'flat', label: 'Квартира'},
                {value: 'house', label: 'Дом'},
                {value: 'room', label: 'Комната'}
            ]} withAsterisk {...form.getInputProps('params.type')} maw={'456px'} mb={'lg'} />
            <TextInput label='Адрес' placeholder="Например, с.Кукуево, ул.Валуева д.33" withAsterisk {...form.getInputProps('params.address')} maw={'456px'} mb={'lg'} />
            <NumberInput label='Площадь' placeholder="46.7" {...form.getInputProps('params.area')} styles={getWarningStyle('area')} hideControls maw={'456px'} mb={'lg'} />
            <NumberInput label='Этаж' placeholder="10" {...form.getInputProps('params.floor')} styles={getWarningStyle('floor')} hideControls maw={'456px'} mb={'lg'} />

        </>
    )
}