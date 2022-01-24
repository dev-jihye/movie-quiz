import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";
import { ROUTE } from "../constance";
import { isLoggedInVar, logUserOut } from "../apolloClient";
import useUser from "../hooks/useUser";
import { loginUserVar } from "../makeVars/UserVars";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "모두의 퀴즈", href: ROUTE.HOME },
  { name: "퀴즈내기", href: ROUTE.CREATE_QUIZ },
];

export default function Nav() {
  const location = useLocation();
  const isLoggedIn = isLoggedInVar();
  const { data } = useUser();
  useEffect(() => {
    loginUserVar(data);
  }, [data]);

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex items-center flex-shrink-0">
                  <Link to={ROUTE.HOME}>
                    <span className="text-3xl">🔥🎬</span>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to={ROUTE.HOME}
                    className={`${
                      location.pathname === ROUTE.HOME
                        ? "border-b-2 border-[#ef7676] inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                        : "border-0 inline-flex items-center px-1 pt-1 text-sm text-gray-700"
                    }`}
                  >
                    모두의 퀴즈
                  </Link>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <button
                  type="button"
                  className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>

                {/* Profile dropdown */}
                {isLoggedIn ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none  focus:ring-[#ef7676] focus:ring-2 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="object-cover w-8 h-8 rounded-full"
                          src={
                            data?.me?.avatar?.Location ||
                            encodeURI(
                              `https://ui-avatars.com/api/?name=${data?.me?.username}&color=7F9CF5&background=EBF4FF`
                            )
                          }
                          alt="profile"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={`${ROUTE.MY_PROFILE}/${data?.me?.id}`}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              내 프로필
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                logUserOut();
                              }}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                              )}
                            >
                              로그아웃
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link
                    to={ROUTE.LOGIN}
                    className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    로그인
                  </Link>
                )}
              </div>
              <div className="flex items-center -mr-2 sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item: any, index: number) => (
                <Link to={item.href} key={index}>
                  <Disclosure.Button
                    as="div"
                    className={`${
                      location.pathname === item.href
                        ? "block py-2 pl-3 pr-4 text-base font-medium border-l-4 bg-[#f7dbdb] border-[#ef7676] items-center  text-[#913838]"
                        : "block py-2 pl-3 pr-4 font-medium border-l-4 border-transparent items-center text-gray-500"
                    }`}
                  >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={
                      data?.me?.avatar?.Location ||
                      encodeURI(
                        `https://ui-avatars.com/api/?name=${data?.me?.username}&color=7F9CF5&background=EBF4FF`
                      )
                    }
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {data?.me?.username}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link to={`${ROUTE.MY_PROFILE}/${data?.me?.id}`}>
                  <Disclosure.Button
                    as="div"
                    className={`${
                      location.pathname ===
                      `${ROUTE.MY_PROFILE}/${data?.me?.id}`
                        ? "block py-2 pl-3 pr-4 text-base font-medium border-l-4 bg-[#f7dbdb] border-[#ef7676] items-center  text-[#913838]"
                        : "block py-2 pl-3 pr-4 font-medium border-l-4 border-transparent items-center text-gray-500"
                    }`}
                  >
                    내 프로필
                  </Disclosure.Button>
                </Link>
                <button
                  onClick={() => {
                    logUserOut();
                  }}
                  className="block w-full px-4 py-2 text-base font-medium text-left text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  로그아웃
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
