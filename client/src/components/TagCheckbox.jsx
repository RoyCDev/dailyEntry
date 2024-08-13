import { useState } from 'react'
import { Tag } from '@chakra-ui/react'

function TagCheckbox({ children, value, register }) {
    const [isChecked, setIsChecked] = useState(false)
    const { ref, ...rest } = register;

    const checkRef = (e) => {
        ref(e)
        setIsChecked(e?.checked)
    }

    const handleClick = () => { setIsChecked(prev => !prev) }

    return (
        <>
            <input type="checkbox" id={value} value={value}{...rest} hidden
                ref={checkRef} onClick={handleClick} />
            <label htmlFor={value}>
                <Tag px={3} borderRadius="full" colorScheme="brand"
                    _hover={{ bg: isChecked ? "brand.600" : "blackAlpha.100" }}
                    variant={isChecked ? "solid" : "outline"}>
                    {children}
                </Tag>
            </label>
        </>
    )
}

export default TagCheckbox