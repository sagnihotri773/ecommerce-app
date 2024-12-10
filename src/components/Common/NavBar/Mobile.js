'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ChevronRight, X, HelpCircle, ShoppingBag, Package, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { userAccountOrderUrl, userFavouriteUrl } from '@/components/RouteManager'


export function MobileView({ handleMenuToggle, isMobileMenuOpen, navBarOptions = [] }) {
    const [currentCategory, setCurrentCategory] = useState(null)
    const [menuHistory, setMenuHistory] = useState([])
    const router = useRouter();

    const navigateToCategory = (category) => {
        setCurrentCategory(category)
        setMenuHistory([...menuHistory, category])
    }

    useEffect(() => {
        return () => {
            setCurrentCategory(null);
            setMenuHistory([]);
        };
    }, []);

    const navigateBack = () => {
        if (menuHistory.length > 1) {
            const newHistory = [...menuHistory]
            newHistory.pop()
            setMenuHistory(newHistory)
            setCurrentCategory(newHistory[newHistory.length - 1])
        } else {
            setCurrentCategory(null)
            setMenuHistory([])
        }
    }

    const handleToggle = () => {
        handleMenuToggle();
        setCurrentCategory(null);
        setMenuHistory([]);
    }

    const renderCategoryItems = (categories = []) => {
        return categories?.map((category) => (
            <Button
                key={category.id}
                variant="ghost"
                className="w-full justify-between text-lg font-normal py-4"
                onClick={() => { category?.children?.length && navigateToCategory(category) }}
            >
                {!category?.children?.length ? <Link href={`/${category?.url}`} prefetch onClick={(e) => handleToggle()}> {category.name} </Link> : category.name}
                {category?.children?.length > 0 && <ChevronRight className="h-5 w-5" />}
            </Button>
        ))
    }

    const handleButtonAction = (url) => {
        handleMenuToggle();
        return router.push(url)
    }

    return (
        <>
            <Sheet open={isMobileMenuOpen} >
                <SheetContent side="right" className="w-[300px] sm:w-[300px] p-0 bg-white" style={{ zIndex: "9999" }}>
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between items-center p-4 border-b">
                            {currentCategory ? (
                                <Button variant="ghost" size="icon" onClick={navigateBack} className='contents'>
                                    <p className="text-xl font-bold py-2 flex items-center"> <ChevronLeft className="h-6 w-6" />{currentCategory.name}</p>
                                </Button>
                            ) : (
                                <div className="w-6" />
                            )}
                            <Button variant="ghost" size="icon" onClick={() => {
                                handleMenuToggle(false)
                                setCurrentCategory(null)
                                setMenuHistory([])
                            }}>
                                <X className="h-6 w-6" />
                            </Button>
                        </div>
                        <div className="flex-grow overflow-auto">
                            {currentCategory ? (
                                <>
                                    {/* <h2 className="text-xl font-bold p-4">{currentCategory.name}</h2> */}
                                    {renderCategoryItems(currentCategory.children)}
                                </>
                            ) : (
                                renderCategoryItems(navBarOptions)
                            )}
                        </div>
                        <div className="p-4 border-t">
                            <p className="text-sm mb-2 ">Become a Member for the best products, inspiration and stories in sport.</p>
                            <div className="flex gap-2 mb-4">
                                <Button className="flex-1">Join Us</Button>
                                <Button variant="outline" className="flex-1">Sign In</Button>
                            </div>
                            <div className="flex justify-between">
                                <Button variant="ghost" size="sm" className="w-auto px-0">
                                    <HelpCircle className="h-5 w-5 mr-2" />
                                    Help
                                </Button>
                                <Button variant="ghost" size="sm" className="w-auto px-0" onClick={(e) => handleButtonAction(userFavouriteUrl)}>
                                    <ShoppingBag className="h-5 w-5 mr-2" />
                                    Bag
                                </Button>
                                <Button variant="ghost" size="sm" className="w-auto px-0" onClick={(e) => handleButtonAction(userAccountOrderUrl)}>
                                    <Package className="h-5 w-5 mr-2" />
                                    Orders
                                </Button>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}