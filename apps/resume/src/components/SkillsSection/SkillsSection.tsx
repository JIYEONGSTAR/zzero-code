import styled from '@emotion/styled';

import { ISkills } from '../../../_content/Skills';
import Section from '../Section';
import Skill from './Skill';

function SkillsSection({ title, list }: ISkills) {
  return (
    <Section>
      <h2>{title}</h2>
      <GridDiv>
        {list.map((skill, index) => (
          <Skill key={index} {...skill} />
        ))}
      </GridDiv>
    </Section>
  );
}

export default SkillsSection;

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
