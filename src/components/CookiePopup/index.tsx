import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import { Typography } from 'ui-kit';
import css from './styles.module.scss';

const CookiePopup = () => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('hideCookie')) {
      setOpen(true);
    }
  }, []);
  const onOk = () => {
    localStorage.setItem('hideCookie', 'true');
    setOpen(false);
  };
  return isOpen ? (
    <div className={css.root}>
      <Typography type="caption">This website uses cookies.</Typography>
      <Typography type="tiny">
        By continuing to browse, you are agreeing to our use of cookies as
        explained in our cookie policy.
      </Typography>
      <div className={css.btns}>
        <button type="submit" onClick={onOk}>
          Okay
        </button>
        <Link to="/privacy">Learn More</Link>
      </div>
    </div>
  ) : null;
};

export default CookiePopup;
