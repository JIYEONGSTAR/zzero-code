import Link from 'next/link';
import styled from '@emotion/styled';
import { config, NextUITheme, useTheme } from '@nextui-org/react';

import { ICompany } from '../../../_content/Work-Experience';

function Company({ name, position, startDate, endDate, description }: Omit<ICompany, 'projects'>) {
  const { theme } = useTheme();

  return (
    <CompanyCard data-testid="wrapper">
      <h3>{name}</h3>
      <small>
        {startDate} ~ {endDate}
      </small>
      <span>{position}</span>
      <Div theme={theme}>
        {typeof description === 'object' ? (
          description.map(el => (
            <div>
              <Link href={el}>{el}</Link>
            </div>
          ))
        ) : (
          <Link href={description}>{description}</Link>
        )}
      </Div>
    </CompanyCard>
  );
}

export default Company;

const CompanyCard = styled.div`
  position: sticky;
  top: 2rem;
  padding-right: 2rem;

  display: flex;
  flex-direction: column;
  width: 14.375rem;

  @media ${config.media.xsMax} {
    width: 100%;
    padding-right: 0;
  }
`;

const Div = styled.div<{ theme: NextUITheme | undefined }>`
  color: ${({ theme }) => theme.colors.accents6.value};

  > a,
  > div > a {
    text-decoration: underline;
    color: gray;
    font-size: 0.8rem;
  }
`;
