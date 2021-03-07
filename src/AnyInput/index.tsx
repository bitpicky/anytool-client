import React from 'react'
import { useRecoilState } from 'recoil';
import { selectedTable } from '../atoms';
import styled from 'styled-components';
import classnames from 'classnames';

const InputContainer: any = styled.div`
  position: relative;
  &:hover {
      background-color: white;
  }

  &.with-change {
    background-color: #ffffda;
  }

  input {
    background-color: transparent;
    border: none;
    outline: none;
  }
`;

const AnyInput: React.FC<any> = (props) => {
  const { record, header, text, onInputChange } = props;
  // const [table] = useRecoilState(selectedTable);
  const [value, setValue] = React.useState(text)
  const classes = classnames({
    'with-change': text !== value
  });

  const onChange = (ev: any) => {
    const newValue = ev.target.value
    setValue(newValue);

    if (newValue !== text) {
      onInputChange({ id: record.id, header, value: newValue })
    } else {
      onInputChange({ id: record.id, header, value: newValue }, true)
    }
  }

  return (
    <InputContainer className={classes}>
      <input value={value || ''} onChange={onChange} />
    </InputContainer>
  )
}

export default AnyInput;
