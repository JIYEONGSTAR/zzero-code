import styled from '@emotion/styled';
import { Button as NextButton, config } from '@nextui-org/react';
import { useMediaQuery } from 'core';

function DownloadButton() {
  const isSmallButtonSize = useMediaQuery(650);
  const handleDownload = () => {
    window.print();
  };
  return (
    <Div>
      <Button shadow color="primary" auto onClick={handleDownload} size={isSmallButtonSize ? 'sm' : 'md'}>
        Download
      </Button>
    </Div>
  );
}

export default DownloadButton;

const Div = styled.div`
  position: fixed;
  bottom: 5rem;
  right: 2rem;

  @media print {
    display: none;
  }

  @media ${config.media.xsMax} {
    bottom: 5rem;
    right: 1.25rem;
  }
`;

const Button = styled(NextButton)`
  font-weight: bold;
  font-size: 0.7rem;
`;
