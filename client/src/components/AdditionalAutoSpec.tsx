import { NumberInput, Select, TextInput } from "@mantine/core";

export default function AdditionalAutoSpec(form, getWarningStyle) {
    
    return (
        <>
        
            <TextInput label='Марка' placeholder="BMW" {...form.getInputProps('params.brand')} mb={"sm"} styles={getWarningStyle('brand')} maw={'456px'} />
            <TextInput label='Модель' placeholder="M5" {...form.getInputProps('params.model')} mb={"sm"} styles={getWarningStyle('model')} maw={'456px'} />
            <TextInput label='Год производства' placeholder="Например, 2020" {...form.getInputProps('params.yearOfManufacture')} styles={getWarningStyle('yearOfManufacture')} maw={'456px'}/>
            <Select label='Коробка' data={[
                {value: 'automatic', label: 'Автомат'},
                {value: 'manual', label: 'Механика'}
            ]} {...form.getInputProps('params.transmission')} styles={getWarningStyle('transmission')} maw={'456px'} />
            <NumberInput label='Пробег' placeholder="Например, 30000" hideControls {...form.getInputProps('params.mileage')} maw={'456px'} />
            <NumberInput label='Мощность двигателя, л.с.' placeholder="130" hideControls {...form.getInputProps('params.enginePower')} maw={'456px'} />
        </>
    )
}