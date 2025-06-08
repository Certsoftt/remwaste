import React, { memo, useState, useCallback } from 'react';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import { useWindowSize } from '../../hooks/useWindowSize';
import { NAV_ITEMS } from '../../utils/constants';
import * as S from './styles';

const NavbarComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Memoized menu items to prevent unnecessary re-renders
  const renderMenuItems = useCallback(() => (
    NAV_ITEMS.map(item => (
      <S.MenuItem 
        key={item.key} 
        href={item.href}
        onClick={isMobile ? closeMenu : undefined}
      >
        {item.label}
      </S.MenuItem>
    ))
  ), [isMobile]);

  return (
    <S.NavbarContainer>
      <S.NavWrapper>
        <S.LogoContainer>
          <S.LogoLink href="/">
            <S.Logo
              src="/assets/images/logo.png"
              alt="Billia"
              width={isMobile ? 100 : 120}
              height={isMobile ? 32 : 40}
            />
          </S.LogoLink>
        </S.LogoContainer>

        {/* Desktop Menu */}
        <S.MenuContainer>{renderMenuItems()}</S.MenuContainer>

        {/* Mobile Menu Button */}
        <S.MobileMenuButton>
          <Button
            type="text"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            icon={isOpen ? <CloseOutlined /> : <MenuOutlined />}
            onClick={toggleMenu}
          />
        </S.MobileMenuButton>

        {/* Mobile Menu Drawer - Only render when mobile */}
        {isMobile && (
          <Drawer
            placement="right"
            onClose={closeMenu}
            open={isOpen}
            width="80%"
            bodyStyle={{ padding: 0 }}
            style={{ maxWidth: 350 }}
            title="Menu"
            footer={null}
            destroyOnClose
          >
            <S.MobileMenuContainer>
              {renderMenuItems()}
            </S.MobileMenuContainer>
          </Drawer>
        )}
      </S.NavWrapper>
    </S.NavbarContainer>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export const Navbar = memo(NavbarComponent);
