import { useState } from 'react';

interface SectionItem {
    id: number;
}

function useSectionManagement<T extends SectionItem>(initialData: T[]) {
    const [sections, setSections] = useState<T[]>(initialData);
    const [nextId, setNextId] = useState(() => {
        if (initialData.length > 0) {
            return Math.max(...initialData.map((item) => item.id)) + 1;
        }
        return 1;
    });

    const addSection = (newItemDefaults: Omit<T, 'id'>) => {
        setSections((prevSections) => [...prevSections, { id: nextId, ...newItemDefaults } as T]);
        setNextId((prevId) => prevId + 1);
    };

    const updateSectionValue = (idToUpdate: number, field: keyof T, newValue: T[keyof T]) => {
        setSections((prevSections) =>
            prevSections.map((section) =>
                section.id === idToUpdate ? { ...section, [field]: newValue } : section,
            ),
        );
    };

    const deleteSection = (idToDelete: number) => {
        setSections((pervSection) => {
            const newSection = pervSection.filter((section) => section.id !== idToDelete);
            if (newSection.length === 0 && pervSection.length === 1) {
                return pervSection;
            }
            return newSection;
        });
    };

    return {
        sections,
        addSection,
        updateSectionValue,
        deleteSection,
    };
}

export default useSectionManagement;
