import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import { SignOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {NavigationContainer, LogoContainer, NavLinks, NavLink} from "./navigation.styles";


const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)

    return(
      <Fragment>
        <NavigationContainer>
          <LogoContainer to="/">
            <Logo className="logo" />
          </LogoContainer>
          <NavLinks>
            <NavLink to="/shop">
                Shop
            </NavLink>
            {currentUser ? (
              <NavLink as='span' onClick={SignOutUser}>
                SignOut
              </NavLink>
            ) : (
              <NavLink to="/auth">
                Sign-in
              </NavLink>)
            }
          <CartIcon />
          </NavLinks>
          {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
}

export default Navigation;