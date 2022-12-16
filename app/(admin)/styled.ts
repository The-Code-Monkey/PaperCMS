import styled from 'styled-components';

export const StyledAside = styled.aside`
  width: ${p => p.theme.sizes[10]};
  overflow-x: hidden;
  transition: width 400ms ease-in-out;

  ul {
    list-style-type: none;
    margin: 0;
    padding: ${p => p.theme.space[3]} 0;
    height: 100%;
    background-color: ${p => p.theme.colors.neutrals[8]};
  }

  li {
    display: flex;
    width: 100%;
    cursor: pointer;
    transition: background-color 200ms ease-in-out;
    margin-bottom: ${p => p.theme.space[2]};

    .active,
    &:hover {
      background-color: ${p => p.theme.colors.neutrals[12]};
    }
  }

  span {
    visibility: hidden;
    margin-left: 10px;
  }

  a {
    display: flex;
    align-items: center;
    padding: ${p => p.theme.space[2]} 0 ${p => p.theme.space[2]} 0.75em;
    width: 100%;
    text-decoration: none;
    color: unset;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }

  &:hover {
    width: ${p => p.theme.sizes[16]};
    transition: width 400ms ease-in-out;

    span {
      visibility: visible;
    }
  }
`;
