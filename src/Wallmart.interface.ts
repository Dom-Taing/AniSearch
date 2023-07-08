// Category Card
// props in Topic types, Topic User type (Done)

// DashBoard
// props in user common, approved Domains type String, adID Number, programID Number, notifications array of Notificaiton folder type (there's a collection type in it), messages
interface DashBoardProps {
    user: any // User
    approvedDomains: String
    adID: Number
    programID: Number
    notifications: any[] // Notification[]
    messages: any[] // Message []
}
// ask nick to finished message type
interface messages {
    id: Number
    user_created: String
    date_created: Date
    user_updated: String
    date_updated: Date
    content: String
    sender_id: String
    brand_id: Number
    recipient_id: String
    campaign_id: Number
    attachment: String
} 
// state (Done) // ask whether to add type to useState
// onCreatedClickHandle (ask what is this function doing currently error), might want to add <affiliatedLinks>
interface affiliatedLinks {
    id: Number
    directus_user_id: Number
    shortened_url: String
    source_url: String
    campaign_id: Number
    social_media_platform: String // might be a type of social Media??
    clicks: Number
    total_commissions: Number
    paid_commissions: Number
    item_id: String
    status: any // enum Status 'draft', 'published', 'Archived'
    user_created: String
    date_created: String // might be date
    user_updated: String
    date_updated: String
    source_origin: any; // enum SourceOrigin: Chrome Extension, DashBoard, Popular Products, Curated Collections, Storefront, Recommended Categories, Collection & Favorite Products
}
// copyToClipBoard (might want to change the first condition to checking the length), isApprovedDomain variable type boolean, newLink might want to be set to empty string instead of null for implicit typing
// copyLink (Done)
// getGreeting (Done)
// TODO: adding affiliatedLinks interface // maybe no need

// Social
// Social Widget
// move socials type to types folder
// props user: type User, state userConnection, state metrics, renderSocialIcon () => ReactNode, 
interface socialWidgetProp {
    user: User
    setUser: (user: User) => void
    connectUser?: (user: User) => void
    socialType: Socials | String // consider erase conditional String
    accessToken: String | null
}
// state (Done) // using implicit type
// condition in useEffect if(accessToken != null)
// renderSocialIcon (Done)
// renderSocialConnectButtons, condition if(accessToken != null)
interface analytics {

}
// TODO: recheck this, (connectionStatus, moving type to type folder), (adding analytics interface), //might not need to add this

// Social Widgets
// props user: type User, setUser function, 
interface socialWidgetsProp {
    user: User 
    setUser: (user: User) => void // ask whether this is optional component that use it doesn't provide it but it use it
}
// variable consider moving out of component
// renderSocialWidget function (Done) implicit typing
// TODO: ask question of what is required, default props fixed

// Social Connect
// props user: type User, 
interface socialConnectProp {
    user: User 
    setUser: (user: User) => void
}
// renderSocialWidget isSocialIsConnected hardcoded?, (Done) // implicit typing

// Top Categories
// prop: user as User type, title String
interface topCategoriesProp {
    user: User 
    title: String
}

// Card Collection
// props: data: resourceData, other props already exist
interface CardCollectionProp {
    data: resourceData []
    collectionTitle: String
    viewAllHref?: String
    viewAllAnchorText?: String
    showExcerpt?: boolean
    showTopics?: boolean
}
// getTopicList (item: Topic[]) => JSX.element[] // might be implicit type when you add the resourceData interface, rendered variable: JSX.element[]
// renderCards (item: resourceData[]) => JSX.element
interface resourceData  { // data more info can be found on local database
    content: String
    date_created: String
    date_updated?: String
    hero: String
    id: Number
    status: String // maybe enum
    subtitle: String
    teaser: string
    thumbnail: string
    title: String
    topics: Topic[] // Topic
    user_created: String
    user_updated: String
}
// TODO: getTopicList function do what?? need to check how to type check this

// curated_collection CollectionTile
// props: data: curated_collectionData
interface CollectionTileProps {
    data: curatedCollectionData
    buttonTitle?: string
    description?: string
    isShowSocialIcon?: string
}
interface curatedCollectionData {
    id: Number
    title: String
    image: String
    shelf_type: Category Page | Manual
    category_id: String
    url: String
    sort: String
    status: any // enum Status 'draft', 'published', 'Archived'
    user_created: String
    Date_created: String
}

// withDotEnv (Done)


// Layout 
// index
interface LayoutProps {
    children: React.ReactNode
    intro?: React.ReactNode
    user?: User
}
// state (Done)

// NarrowContainer
interface NarrowContainer {
    children: React.ReactNode
}

// Minimal
// Index
interface MinimalLayoutProp {
    active?: String
    children: React.ReactNode
    user?: User 
    withSideBar?: boolean
    notifications?: Notification[]
    messages?: Message[]
    fullWidth?: boolean
}

//UserMenu 
interface UserMenuProp {
    user: User  
    notifications?: Notification[] // maybe optional
    messages?: Message[] // maybe optional
}
// state (Done) // implicit typing

// SideBar
interface SideBarProp {
    active?: String
    user: User
}

// Header/Header
interface HeaderProp {
    user: User  
    notifications?: Notification[] // maybe optional
    messages?: Message[] // maybe optional
}

// Header/MobileMenu
// getActiveSocialNetworkList (user: User) => {number}
// plurize (Done) // Implicit typing
interface MobileMenuProp {
    user: User  
    notifications?: Notification[] // maybe optional
    messages?: Message[] // maybe optional
}
// State (Done) // implicit Typing

// layout/headers
interface headerProp {
    user?: User 
    intro?: React.ReactNode
    headline?: String
}

// layout/SideBar
interface SideBarProp {
    user: User
}

// Service/preso_client

 

