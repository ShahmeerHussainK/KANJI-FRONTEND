export const customStyles = {
  container: (provided) => ({
    ...provided,
    display: 'inline-block',
    width: '35%',
    minHeight: '1px',
    textAlign: 'left',
    border: 'none',
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: '5',
    minHeight: '10px',
    height: '48px',
    width: '100%',
  }),
  input: (provided) => ({
    ...provided,
    minHeight: '1px',
    height: '48px',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    minHeight: '1px',
    paddingTop: '0',
    paddingBottom: '0',
    color: '#757575',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    minHeight: '1px',
    height: '24px',
  }),
  clearIndicator: (provided) => ({
    ...provided,
    minHeight: '1px',
  }),
  valueContainer: (provided) => ({
    ...provided,
    minHeight: '1px',
    height: '40px',
    paddingTop: '0',
    paddingBottom: '0',
  }),
  singleValue: (provided) => ({
    ...provided,
    minHeight: '1px',
    paddingBottom: '2px',
  }),
};
