import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import RecentList from './RecentList';
import theme from '../../../styles/theme';
import SuggestionLists from './SuggestionLists';

const SearchBar = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [recentSearch, setRecentSearch] = useState(
    JSON.parse(localStorage.getItem('recentSearch'))
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const modalRef = useRef(null);

  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      setIsFocus(false);
    }
  };

  const handleClickOutside = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsFocus(false);
    }
  };

  const handleChange = e => {
    setSearchText(e.target.value);
  };

  const handleSearch = e => {
    e.preventDefault();
    if (searchText) {
      const today = new Date();
      setRecentSearch([
        {
          type: 'query',
          content: searchText,
          time: `${today.toLocaleString()}:${today.getMilliseconds()}`,
          query: searchText,
        },
        ...recentSearch,
      ]);

      searchParams.set('search', searchText);
      setSearchParams(searchParams);
      navigate(`/productList?${searchParams.toString()}`);
    }

    setIsFocus(false);
    setSearchText('');
  };

  const handleOnClick = () => {
    if (!isFocus) setIsFocus(true);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  useEffect(() => {
    if (isFocus) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isFocus]);

  useEffect(() => {
    localStorage.setItem('recentSearch', JSON.stringify(recentSearch));
  }, [recentSearch]);

  const [searchTexts, setSearchTexts] = useState([]);
  const [suggestionLists, setSuggestionLists] = useState([]);

  useEffect(() => {
    if (searchText) {
      setIsFocus(true);
    }

    if (isSyllable()) {
      setSearchTexts(searchText.split(' ').filter(s => s !== ''));
    }
  }, [searchText]);

  const isSyllable = (text = searchText) => {
    const unicode = `${text[text.length - 1]}`.charCodeAt();
    if ((12593 <= unicode && unicode <= 12643) || unicode === 32) return false;
    return true;
  };

  useEffect(() => {
    fetch(
      `http://138.2.112.49:3003/shops?search=${searchTexts[0]}&offset=0&limit=100&sort=likes`
    )
      .then(res => res.json())
      .then(data => {
        const filtered = data.list.filter(list => {
          return searchTexts.every(cur =>
            [...list.bread, list.shopAddress, list.shopName]
              .join(' ')
              .includes(cur)
          );
        });

        setSuggestionLists(filtered);
      });
  }, [searchTexts]);

  return (
    <>
      <Search isFocus={isFocus} ref={modalRef}>
        <Form onSubmit={handleSearch}>
          <Input
            placeholder="지역, 빵 또는 가게명 입력"
            onFocus={() => setIsFocus(true)}
            onChange={handleChange}
            value={searchText}
            onClick={handleOnClick}
          />
          <IconButton onClick={handleSearch}>
            <FaSearch />
          </IconButton>
        </Form>
        {isFocus && (
          <SearchModal>
            {searchText ? (
              <SuggestionLists
                suggestionLists={suggestionLists}
                setIsFocus={setIsFocus}
                setSearchText={setSearchText}
              />
            ) : (
              <RecentList
                recentSearch={recentSearch}
                setRecentSearch={setRecentSearch}
                setSearchText={setSearchText}
                setIsFocus={setIsFocus}
              />
            )}
            <ModalSpace />
          </SearchModal>
        )}
      </Search>
      {isFocus && <SearchBg />}
    </>
  );
};

export default SearchBar;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalSpace = styled.div`
  padding-bottom: 20px;
`;

const SearchModal = styled.div`
  position: absolute;
  z-index: 1010;
  top: 48px;
  left: 0px;
  width: 100%;
  max-height: 430px;
  overflow: hidden auto;
  background-color: rgb(255, 255, 255);
  border-top: 1px solid #e0e0e0;
  box-shadow: rgb(0 0 0 / 70%) 0px 7px 8px 2px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    margin-bottom: 20px;
  }

  ::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #404040;
  }

  ::-webkit-scrollbar-thumb:active {
    background: #808080;
  }

  ::-webkit-scrollbar-button {
    display: none;
  }
`;

const SearchBg = styled.div`
  position: fixed;
  ${theme.common.flexCenter}
  top: 90px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
  animation: ${fadeIn} 0.5s;
  animation-fill-mode: both;
`;

const Search = styled.div`
  position: relative;
  ${theme.common.flexSpaceBetween}
  width: ${({ isFocus }) => (isFocus ? '500px' : '350px')};
  height: 48px;
  padding: 7px;
  background-color: white;
  border-radius: 24px;
  border-radius: ${({ isFocus }) => (isFocus ? '24px 24px 0px 0px' : '24px')};
  border: none;
  transition: all 0.2s ease-in-out;
  background-color: ${theme.color.gray};
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 8px 0px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Input = styled.input`
  flex-grow: 0.8;
  height: 24px;
  padding-left: 20px;
  border: none;
  outline: none;
  background-color: ${theme.color.gray};
`;

const IconButton = styled.button`
  ${theme.common.flexCenter}
  width: 40px;
  height: 38px;
  padding: 10px;
  background-color: #fcb44d;
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 100%;
  cursor: pointer;
`;
