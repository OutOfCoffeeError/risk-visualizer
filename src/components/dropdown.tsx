import React, { useState } from 'react';

interface DropdownProps
{
    options: any[];
    onChange: (selectedValue: string) => void;
}

function Dropdown(props: DropdownProps)
{

    const [selectedValue, setSelectedValue] = useState(props && props.options ? props.options[0] : '');

    function handleDropdownChange(event: React.ChangeEvent<HTMLSelectElement>)
    { 
        const newValue = event.target.value;
        setSelectedValue(newValue);
        props.onChange(newValue);
    }

    return (
        <select className='border-solid border-2 border-sky-500 mt-6 ml-3' value={selectedValue} onChange={handleDropdownChange}>
            {props.options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

export default Dropdown;
