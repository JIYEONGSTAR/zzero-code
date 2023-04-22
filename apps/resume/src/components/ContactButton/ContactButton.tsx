import Link from 'next/link';
import styled from '@emotion/styled';
import { Button as NextButton, config, useTheme } from '@nextui-org/react';
import { useMediaQuery } from 'core';
import { useKBar } from 'kbar';

import { blogUrl, email, githubUrl, resumeUrl } from '../../../_config';
import Li from '../Li';
function ContactButton() {
  const { query } = useKBar();
  const isSmallButtonSize = useMediaQuery(650);
  const { theme } = useTheme();
  const contacts = [
    { name: 'blog', url: blogUrl },
    { name: 'github', url: githubUrl },
    { name: 'email', url: email },
    { name: 'resume', url: resumeUrl },
  ];

  return (
    <>
      <Div>
        <Button shadow color="primary" auto onClick={() => query.toggle()} size={isSmallButtonSize ? 'sm' : 'md'}>
          Contact
        </Button>
      </Div>
      <PrintOnly>
        <h3> Contact</h3>
        <ul>
          {contacts.map(contact => (
            <Li key={contact.name} theme={theme}>
              {contact.name}: <Link href={contact.url}>{contact.url}</Link>
            </Li>
          ))}
        </ul>
      </PrintOnly>
    </>
  );
}

export default ContactButton;

const Div = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 2rem;

  @media ${config.media.xsMax} {
    bottom: 1rem;
    right: 1.25rem;
  }
  @media print {
    display: none;
  }
`;

const Button = styled(NextButton)`
  font-weight: bold;
`;

const PrintOnly = styled.div`
  display: none;
  ul > li > a {
    text-decoration: underline;
    color: gray;
  }
  @media print {
    display: block;
  }
`;
