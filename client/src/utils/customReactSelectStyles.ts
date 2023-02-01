export const customStyles = {
  control: (provided: Record<string, unknown>, state: any): any => ({
    ...provided,
    boxShadow: 'none',
    borderColor: 'none',
    '&:hover': {
      color: '#75c55e'
    },
    border: state.isFocused === true ? '1.5px solid #75c55e' : '1.5px solid #cbd5e1'
  }),
  option: (styles: any, state: any): any => ({
    ...styles,
    color: state.isSelected === true ? '#FFF' : styles.color,
    backgroundColor: state.isSelected === true ? '#75c55e' : styles.color,
    borderBottom: '1px solid rgba(0, 0, 0, 0.125)',
    '&:hover': {
      color: '#FFF',
      backgroundColor: '#75c55e'
    }
  }),
  input: (base: any): any => ({
    ...base,
    'input:focus': {
      boxShadow: 'none',
      border: '1px solid #75c55e'
    }
  }),
  menuPortal: (base: any): any => ({ ...base, zIndex: 9999 })
}
