import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTE } from "../constance";
import useUser from "../hooks/useUser";
import { isAuthVar, logUserOut } from "../apollo";
import { useReactiveVar } from "@apollo/client";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const isAuth = useReactiveVar(isAuthVar);
  const location = useLocation();
  const navigate = useNavigate();
  const { data, loading } = useUser();

  const headerNavs = [
    {
      name: "모두의 퀴즈",
      to: ROUTE.HOME,
      current: location.pathname === ROUTE.HOME,
    },
    { name: "퀴즈 모음", to: "#", current: location.pathname === "#" },
  ];

  const userNavs = [{ name: "내 프로필", to: "#" }];

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex items-center flex-shrink-0">
                  <Link to={ROUTE.HOME}>
                    <img
                      className="block w-auto h-8 lg:hidden"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt="Workflow"
                    />
                    <img
                      className="hidden w-auto h-8 lg:block"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                      alt="Workflow"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  {headerNavs.map((nav, index) => (
                    <Link
                      key={index}
                      to={nav.to}
                      className={`${
                        nav.current ? "border-indigo-500" : "border-transparent"
                      } inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 hover:border-gray-300 hover:text-gray-700`}
                    >
                      {nav.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* notifications */}
                {isAuth && (
                  <button
                    type="button"
                    className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                )}

                {/* Profile dropdown */}
                {isAuth ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="object-cover w-8 h-8 rounded-full"
                          src={
                            data?.me?.avatar ||
                            encodeURI(
                              `https://ui-avatars.com/api/?name=${data?.me?.username}&color=7F9CF5&background=EBF4FF`
                            )
                          }
                          alt={`${data?.me?.username}'s profile`}
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
                      <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavs.map((nav, index) => (
                          <Menu.Item key={index}>
                            {({ active }) => (
                              <Link
                                to={nav.to}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {nav.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                        {/* 로그아웃 버튼 */}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                logUserOut(navigate);
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
                    className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    로그인
                  </Link>
                )}
              </div>
              <div className="flex items-center -mr-2 sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
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
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              {headerNavs.map((nav, index) => (
                <Link to={nav.to} key={index}>
                  <Disclosure.Button
                    className={`${
                      nav.current
                        ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                        : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                    } block py-2 pl-3 pr-4 text-base font-medium border-l-4 w-full text-left`}
                  >
                    {nav.name}
                  </Disclosure.Button>
                </Link>
              ))}
              {!isAuth && (
                <Link to={ROUTE.LOGIN}>
                  <Disclosure.Button
                    className={`${
                      location.pathname === ROUTE.LOGIN
                        ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                        : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                    } block py-2 pl-3 pr-4 text-base font-medium border-l-4 w-full text-left`}
                  >
                    로그인
                  </Disclosure.Button>
                </Link>
              )}
            </div>
            {isAuth ? (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="object-cover w-10 h-10 rounded-full"
                      src={
                        data?.me?.avatar ||
                        encodeURI(
                          `https://ui-avatars.com/api/?name=${data?.me?.username}&color=7F9CF5&background=EBF4FF`
                        )
                      }
                      alt={`${data?.me?.username}'s profile`}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {data?.me?.username}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex-shrink-0 p-1 ml-auto text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  {userNavs.map((nav, index) => (
                    <Link to={nav.to} key={index}>
                      <Disclosure.Button className="block w-full px-4 py-2 text-base font-medium text-left text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                        {nav.name}
                      </Disclosure.Button>
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      logUserOut(navigate);
                    }}
                    className="block w-full px-4 py-2 text-base font-medium text-left text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            ) : null}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
