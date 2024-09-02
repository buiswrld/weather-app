import { Select } from '@chakra-ui/react'
/**
 * @returns A React component that renders a user selection dropdown.
 */
const SelectUser = () => (
  <Select
    placeholder="User"
    size="sm"
    width="270px"
    height="36px"
    maxWidth="100%"
    background-color = "white"
    variant = "filled"
    rounded = "md"
    marginX = "60px"
    marginY = "80px"
    fontFamily = "inter"
  />
)

export default SelectUser;
