import {useEffect, useState} from 'react';
import './index.less';
const Menu = (props)=>{
    const [activeKeys, setActiveKeys] = useState({});
    let {data, onClick, initActiveKeys, activeKeys: propsKeys} = props;
    if (!onClick) {
        onClick = (item, path)=>{
            const keys = {};
            path.forEach(item=>{
                keys[item.key] = true;
            });
            setActiveKeys(keys);
        };
    }
    if (!propsKeys) {
        propsKeys = activeKeys || {};
    }
    useEffect(()=>{
        setActiveKeys(initActiveKeys);
    }, [initActiveKeys]);

    const makeMenu = (navs)=>{
        const res = [];
        navs.forEach(nav=>{
             const path = [nav];
             res.push(<div key={nav.key} className={'nav-item ' + (propsKeys[nav.key] ? 'active' : '')}>
                 <span onClick={()=>{onClick(nav, path);}}>
                    {nav.title}
                    {nav.children && nav.children.length > 0 ? <i className="dropdown-icon"></i> : false}
                 </span>
                 {nav.children ? <div className="nav-children">{makeSubMenu(nav.children, path)}</div> : false}
             </div>);
        });
        return res;
    };

    const makeSubMenu = (menus = [], path)=>{
        const res = [];
        menus.forEach(menu=>{
            const subPath = [...path, menu];
            res.push(<div key={menu.key} className={'sub-item ' + (propsKeys[menu.key] ? 'active' : '')}>
                <span onClick={()=>{onClick(menu, subPath);}}>{menu.title}</span>
                {menu.children ? <div className="sub-children">
                {makeThirdMenu(menu.children, subPath)}
                </div> : false}
            </div>);
        });
        return res;
    };

    const makeThirdMenu = (items = [], path)=>{
        return items.map(item=>{
            const itemPath = [...path, item];
            return <div key={item.key} className={'menu-item ' + (propsKeys[item.key] ? 'active' : '')}>
                <span onClick={()=>{onClick(item, itemPath);}}>{item.title}</span>
                {item.children ? <div className="item-children">
                    {makeThirdMenu(item.children, itemPath)}
                </div> : false}
            </div>;
        });
    };
    return <div className="m-top-menu">
        {makeMenu(data)}
    </div>;
};
export default Menu;
