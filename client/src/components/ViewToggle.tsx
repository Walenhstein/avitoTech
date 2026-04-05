
import { Center, rem, SegmentedControl } from "@mantine/core";
import { useAppStore } from "../store/useAppStore";
import { IconLayoutGrid, IconList } from "@tabler/icons-react";

export default function ViewToggle() {
    const viewMode = useAppStore((state) => state.viewMode);
    const setViewMode = useAppStore((state) => state.setViewMode);

    return(
        <SegmentedControl value={viewMode} h={'38px'} onChange={(value) => setViewMode(value as 'grid' | 'list')} 
        data={[
            {
                value: 'grid',
                label: (
                    <Center>
                        <IconLayoutGrid style={{width: rem(20), height: '24px'}} />
                    </Center>
                )
            },
            {
                value: 'list',
                label: (
                    <Center>
                        <IconList style={{width: rem(20), height: rem(20)}} />
                    </Center>
                )
            }
        ]}
        />
    )
}