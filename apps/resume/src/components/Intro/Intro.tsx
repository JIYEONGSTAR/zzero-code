import styled from '@emotion/styled';
import { useTheme } from '@nextui-org/react';

import { IIntro } from '../../../_content/Intro';
import Section from '../Section/Section';

function Intro({ list }: IIntro) {
  const { theme } = useTheme();
  return (
    <Section>
      <h2>Introduce</h2>
      {list.map((intro, index) => (
        <Div key={index} theme={theme}>
          {intro}
        </Div>
      ))}
    </Section>
  );
}

export default Intro;

const Div = styled.div`
  display: flex;
  margin: 1rem;
`;
